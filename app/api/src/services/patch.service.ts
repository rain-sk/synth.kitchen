import type { PatchQuery } from "synth.kitchen-shared";
import { randomId, randomName } from "synth.kitchen-shared";

import { AppDataSource } from "../data-source";
import { Patch } from "../entity/Patch";

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

  static getPatch = async (
    info: PatchQuery
  ): Promise<Patch | Patch[] | undefined> => {
    const [where, params] = getPatchParams(info);

    try {
      const query = AppDataSource.getRepository(Patch)
        .createQueryBuilder("patch")
        .where(where, params);

      return info.creatorId
        ? await query.getMany()
        : await query.getOneOrFail();
    } catch (error) {
      console.error(error);
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
