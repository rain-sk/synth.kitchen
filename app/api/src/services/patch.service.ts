import { PatchQuery, randomId, randomName } from "synth.kitchen-shared";

import { AppDataSource } from "../data-source";
import { Patch } from "../entity/Patch";
import { User } from "../entity/User";

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

  static getRandomPatch = async (): Promise<Patch | null> => {
    try {
      const patch = await AppDataSource.getRepository(Patch)
        .createQueryBuilder("patch")
        .orderBy("RANDOM()")
        .limit(1)
        .getOne();
      return patch || null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  static savePatch = async (patchData: Partial<Patch>): Promise<Patch> => {
    const { id, name, slug } = await PatchService.getUniquePatchId();
    const patch = AppDataSource.getRepository(Patch).create({
      id,
      name,
      slug,
      ...patchData,
    });
    return await AppDataSource.getRepository(Patch).save(patch);
  };

  static updatePatch = async (
    id: string,
    patchData: Partial<Patch>
  ): Promise<Patch> => {
    const patchRepository = AppDataSource.getRepository(Patch);
    const existingPatch = await patchRepository.findOne({ where: { id } });
    if (!existingPatch) {
      throw new Error("Patch not found");
    }
    const updatedPatch = Object.assign(existingPatch, patchData);
    return await patchRepository.save(updatedPatch);
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
