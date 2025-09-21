import { PatchQuery, randomId, randomName } from "synth.kitchen-shared";

import { AppDataSource } from "../data-source";
import { Patch } from "../entity/Patch";
import { User } from "../entity/User";
import { SavedPatchState } from "../entity/SavedPatchState";
import { UnauthorizedError } from "express-jwt";

const uniquePatchId = async () => {
  for (let i = 0; i < 10; i++) {
    const id = randomId();
    if (!(await PatchService.patchExists({ id }))) {
      return id;
    }
  }
  throw new Error("too many retries");
};

const uniquePatchNameAndSlug = async (id: string) => {
  for (let i = 0; i < 10; i++) {
    const name = randomName();
    const idPart = id.split("-")[0];
    const slug = `${name}-${idPart}`;

    if (!(await PatchService.patchExists({ slug }))) {
      return { name, slug };
    }
  }
};

const getPatchParams = (query: PatchQuery): [string, PatchQuery] => {
  let where: string;
  let params: PatchQuery;
  if ("id" in query) {
    where = "patch.id = :id";
    params = { id: query.id };
  } else if ("slug" in query) {
    where = "patch.slug = :slug";
    params = { slug: query.slug };
  } else if ("creatorId" in query) {
    where = "patch.creatorId = :creatorId";
    params = { creatorId: query.creatorId };
  }
  return [where, params];
};

export class PatchService {
  static patchExists = async (info: PatchQuery): Promise<boolean> => {
    const [where, params] = getPatchParams(info);

    try {
      return await AppDataSource.getRepository(Patch)
        .createQueryBuilder("patch")
        .where(where, params)
        .getExists();
    } catch (error) {
      console.error(error);
    }
    return false;
  };

  static forkPatch = async (
    patchId: string,
    userId: string
  ): Promise<Patch> => {
    const patchRepository = AppDataSource.getRepository(Patch);

    const originalPatch = await patchRepository.findOne({
      where: { id: patchId },
      relations: ["creator", "samples"],
    });

    if (!originalPatch) {
      throw new Error("Original patch not found");
    }

    const newPatch = patchRepository.create();
    newPatch.name = originalPatch.name;
    newPatch.slug = `${originalPatch.slug}-fork-${randomId().substring(0, 5)}`;
    newPatch.state = originalPatch.state;
    newPatch.samples = originalPatch.samples;
    newPatch.public = originalPatch.public;
    newPatch.creator = { id: userId } as User;
    newPatch.forkedFrom = originalPatch;

    return await patchRepository.save(newPatch);
  };

  static getPatch = async (
    info: PatchQuery
  ): Promise<Patch | Patch[] | undefined> => {
    const [where, params] = getPatchParams(info);

    try {
      const query = AppDataSource.getRepository(Patch)
        .createQueryBuilder("patch")
        .leftJoinAndSelect("patch.state", "state")
        .where(where, params);
      const result = info.creatorId
        ? await query.getMany()
        : await query.getOneOrFail();
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  static getPatchInfo = async (
    info: PatchQuery
  ): Promise<Patch | Patch[] | undefined> => {
    const [where, params] = getPatchParams(info);

    try {
      const query = AppDataSource.getRepository(Patch)
        .createQueryBuilder("patch")
        .where(where, params);
      const result = info.creatorId
        ? await query.getMany()
        : await query.getOneOrFail();
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  static getRandomPatch = async (): Promise<Patch | null> => {
    try {
      const patch = await AppDataSource.getRepository(Patch)
        .createQueryBuilder("patch")
        .leftJoinAndSelect("patch.state", "state")
        .orderBy("RANDOM()")
        .limit(1)
        .getOne();
      return patch || null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  static savePatch = async (
    userId: string,
    patchData: Partial<Patch>
  ): Promise<Patch> => {
    const creator = await AppDataSource.getRepository(User).findOneOrFail({
      where: { id: userId },
    });

    const { id, name, slug } = await PatchService.getUniquePatchId();
    const patch = AppDataSource.getRepository(Patch).create({
      ...patchData,
      id,
      name,
      slug,
      creator,
    });

    const state = AppDataSource.getRepository(SavedPatchState).create({
      state: patch.state.state,
    });

    await AppDataSource.getRepository(SavedPatchState).save(state);
    await AppDataSource.getRepository(Patch).save(patch);

    patch.state = state;
    state.patch = patch;

    await AppDataSource.getRepository(SavedPatchState).save(state);
    await AppDataSource.getRepository(Patch).save(patch);

    return await AppDataSource.getRepository(Patch).findOneOrFail({
      where: { id },
    });
  };

  static updatePatch = async (
    userId: string,
    id: string,
    patchData: Partial<Patch>
  ): Promise<Patch> => {
    const patchRepository = AppDataSource.getRepository(Patch);
    const existingPatch = await patchRepository.findOne({ where: { id } });
    if (!existingPatch) {
      throw new Error("Patch not found");
    }
    if (existingPatch.creator.id !== userId) {
      throw new UnauthorizedError(
        "credentials_required",
        new Error("Invalid attempt to update another user's patch.")
      );
    }
    if ("state" in patchData) {
      const existingState = await AppDataSource.getRepository(
        SavedPatchState
      ).findOneOrFail({ where: { id: existingPatch.state.id } });
      const newState = AppDataSource.getRepository(SavedPatchState).create(
        patchData.state
      );
      newState.ancestor = existingState;
      newState.patch = existingPatch;
      AppDataSource.getRepository(SavedPatchState).save(existingState);
      AppDataSource.getRepository(SavedPatchState).save(newState);
      patchData.state = newState;
    }

    const updatedPatch = Object.assign(existingPatch, patchData);
    await patchRepository.save(updatedPatch);

    return await AppDataSource.getRepository(Patch).findOneOrFail({
      where: { id },
    });
  };

  static getUniquePatchId = async (): Promise<{
    id: string;
    name: string;
    slug: string;
  }> => {
    const id = await uniquePatchId();
    const { name, slug } = await uniquePatchNameAndSlug(id);
    return { id, name, slug };
  };
}
