import type { SampleQuery } from "synth.kitchen-shared";

import { AppDataSource } from "../data-source";
import { Sample } from "../entity/Sample";

const getSampleParams = (getSampleInfo: SampleQuery): [string, SampleQuery] => {
  let where: string;
  let params: SampleQuery;
  {
    where = "sample.id = :id";
    params = { id: getSampleInfo.id };
  }
  return [where, params];
};
export class SampleService {
  static sampleExists = async (info: SampleQuery): Promise<boolean> => {
    const [where, params] = getSampleParams(info);

    try {
      return await AppDataSource.getRepository(Sample)
        .createQueryBuilder("sample")
        .where(where, params)
        .getExists();
    } catch (error) {
      console.error(error);
    }

    return false;
  };

  static getSample = async (info: SampleQuery): Promise<Sample | undefined> => {
    const [where, params] = getSampleParams(info);

    try {
      return await AppDataSource.getRepository(Sample)
        .createQueryBuilder("sample")
        .where(where, params)
        .getOneOrFail();
    } catch (error) {
      console.error(error);
    }
  };

  static saveSample = async (
    info: SampleQuery
  ): Promise<Sample | undefined> => {
    return;
  };
}
