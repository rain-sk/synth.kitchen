import { ContentQuery, randomId } from "synth.kitchen-shared";

import { AppDataSource } from "../data-source";
import { CustomModule } from "../entity/CustomModule";
import { SavedCustomModuleState } from "../entity/SavedCustomModuleState";
import { User } from "../entity/User";
import { UnauthorizedError } from "express-jwt";

type CustomModuleExistsQuery = { id?: string; slug?: string };

const uniqueCustomModuleId = async () => {
  for (let i = 0; i < 10; i++) {
    const id = randomId();
    if (!(await CustomModuleService.customModuleExists({ id }))) {
      return id;
    }
  }
  throw new Error("too many retries");
};

const uniqueCustomModuleNameAndSlug = async (id: string) => {
  for (let i = 0; i < 10; i++) {
    const name = randomId();
    const idPart = id.split("-")[0];
    const slug = `${name}-${idPart}`;

    if (!(await CustomModuleService.customModuleExists({ slug }))) {
      return { name, slug };
    }
  }
};

const getCustomModuleParams = (
  query: ContentQuery | CustomModuleExistsQuery,
): [string, any] => {
  let where: string;
  let params: any;
  if ("id" in query) {
    where = "customModule.id = :id";
    params = { id: query.id };
  } else if ("slug" in query) {
    where = "customModule.slug = :slug";
    params = { slug: query.slug };
  } else if ("creatorId" in query) {
    where = "customModule.creatorId = :creatorId";
    params = { creatorId: query.creatorId };
  }
  return [where, params];
};

export class CustomModuleService {
  static customModuleExists = async (
    query: CustomModuleExistsQuery,
  ): Promise<boolean> => {
    const [where, params] = getCustomModuleParams(query);

    try {
      return await AppDataSource.getRepository(CustomModule)
        .createQueryBuilder("customModule")
        .where(where, params)
        .getExists();
    } catch (error) {
      console.error(error);
    }
    return false;
  };

  static forkCustomModule = async (
    userId: string,
    custommoduleId: string,
  ): Promise<CustomModule> => {
    const authenticatedUser = await AppDataSource.getRepository(
      User,
    ).findOneOrFail({ where: { id: userId } });

    const customModuleRepository = AppDataSource.getRepository(CustomModule);
    const originalCustomModule = await this.getCustomModule({
      id: custommoduleId,
    });

    if (!originalCustomModule || Array.isArray(originalCustomModule)) {
      throw new Error("Original custom module not found");
    }

    const newCustomModule = customModuleRepository.create();
    newCustomModule.name = originalCustomModule.name;
    newCustomModule.slug = `${originalCustomModule.slug}-fork-${randomId().split("-")[0]}`;
    newCustomModule.state = originalCustomModule.state;
    newCustomModule.public = originalCustomModule.public;
    newCustomModule.creator = authenticatedUser;
    newCustomModule.forkedFrom = originalCustomModule;

    return await this.saveCustomModule(userId, newCustomModule);
  };

  static getCustomModule = async (
    query: ContentQuery,
  ): Promise<CustomModule | CustomModule[] | undefined> => {
    const [where, params] = getCustomModuleParams(query);

    try {
      const queryBuilder = AppDataSource.getRepository(CustomModule)
        .createQueryBuilder("customModule")
        .leftJoinAndSelect("customModule.creator", "creator")
        .leftJoinAndSelect("customModule.state", "state")
        .where(where, params);
      const result = query.creatorId
        ? await queryBuilder.getMany()
        : await queryBuilder.getOneOrFail();
      return result;
    } catch (error) {
      console.error(error);
    }
    return undefined;
  };

  static getCustomModuleInfo = async (query: {
    id?: string;
    slug?: string;
    creatorId?: string;
  }): Promise<CustomModule | CustomModule[] | undefined> => {
    const [where, params] = getCustomModuleParams(query);

    try {
      const queryBuilder = AppDataSource.getRepository(CustomModule)
        .createQueryBuilder("customModule")
        .leftJoinAndSelect("customModule.creator", "creator")
        .where(where, params);
      const result = query.creatorId
        ? await queryBuilder.getMany()
        : await queryBuilder.getOneOrFail();
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  static saveCustomModule = async (
    userId: string,
    customModuleData: Partial<CustomModule>,
  ): Promise<CustomModule> => {
    const creator = await AppDataSource.getRepository(User).findOneOrFail({
      where: { id: userId },
    });

    const customModule = AppDataSource.getRepository(CustomModule).create({
      ...customModuleData,
      id: randomId(),
      creator,
    });

    if (!("slug" in customModuleData)) {
      const { id, name, slug } =
        await CustomModuleService.getUniqueCustomModuleId();

      customModule.id = id;
      customModule.name = name;
      customModule.slug = slug;
    }

    const stateRepository = AppDataSource.getRepository(SavedCustomModuleState);
    const state = stateRepository.create({
      state: { ...customModule.state.state, name: customModule.name },
    });

    state.customModule = null;
    customModule.state = null;
    await AppDataSource.getRepository(CustomModule).save(customModule);
    await stateRepository.save(state);

    state.customModule = customModule;
    state.ancestor = customModule.forkedFrom?.state ?? null;
    customModule.state = state;
    await AppDataSource.getRepository(CustomModule).save(customModule);
    await stateRepository.save(state);

    return (await this.getCustomModule({
      id: customModule.id,
    })) as CustomModule;
  };

  static updateCustomModule = async (
    userId: string,
    custommoduleOrId: CustomModule | string,
    customModuleData: Partial<CustomModule>,
  ): Promise<CustomModule> => {
    const customModuleRepository = AppDataSource.getRepository(CustomModule);
    const stateRepository = AppDataSource.getRepository(SavedCustomModuleState);

    const existingCustomModule: CustomModule =
      typeof custommoduleOrId === "string"
        ? await customModuleRepository.findOne({
            where: { id: custommoduleOrId },
          })
        : custommoduleOrId;

    if (!existingCustomModule) {
      throw new Error("Custom module not found");
    }

    if (existingCustomModule.creator.id !== userId) {
      throw new UnauthorizedError(
        "credentials_required",
        new Error("Invalid attempt to update another user's custom module."),
      );
    }

    if ("state" in customModuleData) {
      const existingState = await stateRepository.findOneOrFail({
        where: { id: existingCustomModule.state.id },
      });
      const newState = stateRepository.create(customModuleData.state);

      newState.id = randomId();
      newState.ancestor = existingState;
      newState.customModule = existingCustomModule;
      await stateRepository.save(newState);
      customModuleData.state = newState as any;
    }

    await customModuleRepository.save(
      Object.assign(existingCustomModule, customModuleData),
    );

    const custommodule = await this.getCustomModule({
      id: existingCustomModule.id,
    });
    return Array.isArray(custommodule) ? custommodule[0] : custommodule;
  };

  static deleteCustomModule = async (
    userId: string,
    custommoduleOrId: CustomModule | string,
  ): Promise<void> => {
    const customModuleRepository = AppDataSource.getRepository(CustomModule);
    const savedCustomModuleStateRepository = AppDataSource.getRepository(
      SavedCustomModuleState,
    );

    const custommoduleResult = await this.getCustomModule({
      id:
        typeof custommoduleOrId === "string"
          ? custommoduleOrId
          : custommoduleOrId.id,
    });

    if (!custommoduleResult || Array.isArray(custommoduleResult)) {
      throw new Error("Custom module not found");
    }

    const custommodule = custommoduleResult as CustomModule;

    if (custommodule.creator.id !== userId) {
      throw new UnauthorizedError(
        "credentials_required",
        new Error("Invalid attempt to delete another user's custom module."),
      );
    }

    const orphanedStates = await savedCustomModuleStateRepository
      .createQueryBuilder("saved_custom_module_state")
      .where("saved_custom_module_state.custommoduleId = :id", {
        id: custommodule.id,
      })
      .getMany();

    custommodule.state = null;
    await customModuleRepository.save(custommodule);
    await savedCustomModuleStateRepository.delete({
      customModule: custommodule,
    });
    await customModuleRepository.delete({ id: custommodule.id });
  };

  static getUniqueCustomModuleId = async (): Promise<{
    id: string;
    name: string;
    slug: string;
  }> => {
    const id = await uniqueCustomModuleId();
    const { name, slug } = await uniqueCustomModuleNameAndSlug(id);
    return { id, name, slug };
  };
}
