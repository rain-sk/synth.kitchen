import {
  PatchInfo,
  PatchQuery,
  randomId,
  randomName,
} from "synth.kitchen-shared";

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
    userId: string,
    patchId: string
  ): Promise<PatchInfo> => {
    const authenticatedUser = await AppDataSource.getRepository(
      User
    ).findOneOrFail({ where: { id: userId } });

    const patchRepository = AppDataSource.getRepository(Patch);
    const originalPatch = await this.getPatch({ id: patchId });

    if (!originalPatch || Array.isArray(originalPatch)) {
      throw new Error("Original patch not found");
    }

    const newPatch = patchRepository.create();
    newPatch.name = originalPatch.name;
    newPatch.slug = `${originalPatch.slug}-fork-${randomId().split("-")[0]}`;
    newPatch.state = originalPatch.state;
    newPatch.samples = originalPatch.samples;
    newPatch.public = originalPatch.public;
    newPatch.creator = authenticatedUser;
    newPatch.forkedFrom = originalPatch;

    return await this.savePatch(userId, newPatch);
  };

  static getPatch = async (
    info: PatchQuery
  ): Promise<Patch | Patch[] | undefined> => {
    const [where, params] = getPatchParams(info);

    try {
      const query = AppDataSource.getRepository(Patch)
        .createQueryBuilder("patch")
        .leftJoinAndSelect("patch.creator", "creator")
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
  ): Promise<PatchInfo | PatchInfo[] | undefined> => {
    const [where, params] = getPatchParams(info);

    try {
      const query = AppDataSource.getRepository(Patch)
        .createQueryBuilder("patch")
        .leftJoinAndSelect("patch.creator", "creator")
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
        .where({ public: true })
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

    const patch = AppDataSource.getRepository(Patch).create({
      ...patchData,
      id: randomId(),
      creator,
    });

    if (!("slug" in patchData)) {
      const { id, name, slug } = await PatchService.getUniquePatchId();

      patch.id = id;
      patch.name = name;
      patch.slug = slug;
    }

    const state = AppDataSource.getRepository(SavedPatchState).create({
      state: { ...patch.state.state, name: patch.name },
    });

    state.patch = null;
    patch.state = null;
    await AppDataSource.getRepository(Patch).save(patch);
    await AppDataSource.getRepository(SavedPatchState).save(state);

    state.patch = patch;
    state.ancestor = patch.forkedFrom.state;
    patch.state = state;
    await AppDataSource.getRepository(Patch).save(patch);
    await AppDataSource.getRepository(SavedPatchState).save(state);

    return (await this.getPatch({ id: patch.id })) as Patch;
  };

  static updatePatch = async (
    userId: string,
    patchOrId: Patch | string,
    patchData: Partial<Patch>
  ): Promise<Patch> => {
    const patchRepository = AppDataSource.getRepository(Patch);
    const stateRepository = AppDataSource.getRepository(SavedPatchState);

    const existingPatch: Patch =
      typeof patchOrId === "string"
        ? await patchRepository.findOne({ where: { id: patchOrId } })
        : patchOrId;

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
      const existingState = await stateRepository.findOneOrFail({
        where: { id: existingPatch.state.id },
      });
      const newState = stateRepository.create(patchData.state);
      newState.id = randomId();
      newState.ancestor = existingState;
      newState.patch = existingPatch;
      await stateRepository.save(newState);
      patchData.state = newState;
    }

    await patchRepository.save(Object.assign(existingPatch, patchData));

    const patch = await this.getPatch({ id: existingPatch.id });
    return Array.isArray(patch) ? patch[0] : patch;
  };

  static deletePatch = async (
    userId: string,
    patchId: string
  ): Promise<void> => {
    const patchRepository = AppDataSource.getRepository(Patch);
    const savedPatchStateRepository =
      AppDataSource.getRepository(SavedPatchState);

    const patch = await this.getPatch({ id: patchId });

    if (!patch || Array.isArray(patch)) {
      throw new Error("Patch not found");
    }

    if (patch.creator.id !== userId) {
      throw new UnauthorizedError(
        "credentials_required",
        new Error("Invalid attempt to delete another user's patch.")
      );
    }

    const orphanedStates = await savedPatchStateRepository
      .createQueryBuilder("saved_patch_state")
      .where("saved_patch_state.patchId = :id", { id: patch.id })
      .getMany();

    patch.state = null;
    await patchRepository.save(patch);
    await savedPatchStateRepository.delete({ patch: patch });
    await patchRepository.delete({ id: patch.id });
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
