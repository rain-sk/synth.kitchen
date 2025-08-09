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

const getPatchParams = (getPatchInfo: PatchQuery): [string, PatchQuery] => {
  let where: string;
  let params: PatchQuery;
  if ("id" in getPatchInfo) {
    where = "patch.id = :id";
    params = { id: getPatchInfo.id };
  } else if ("slug" in getPatchInfo) {
    where = "patch.slug = :slug";
    params = { slug: getPatchInfo.slug };
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

  static getPatch = async (info: PatchQuery): Promise<Patch | undefined> => {
    const [where, params] = getPatchParams(info);

    try {
      return await AppDataSource.getRepository(Patch)
        .createQueryBuilder("patch")
        .where(where, params)
        .getOneOrFail();
    } catch (error) {
      console.error(error);
    }
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
