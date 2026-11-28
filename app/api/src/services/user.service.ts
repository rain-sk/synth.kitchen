import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { EmailCode } from "../entity/EmailCode";
import { SavedPatchState } from "../entity/SavedPatchState";
import { Patch } from "../entity/Patch";
import { PatchService } from "./patch.service";
import { PatchInfo } from "synth.kitchen-shared";

type GetUserInfo = { id: string } | { email: string } | { username: string };

const getUserParams = (getUserInfo: GetUserInfo): [string, GetUserInfo] => {
  let where: string;
  let params: GetUserInfo;
  if ("id" in getUserInfo) {
    where = "user.id = :id";
    params = { id: getUserInfo.id };
  } else if ("email" in getUserInfo) {
    where = "user.email = :email";
    params = { email: getUserInfo.email };
  } else if ("username" in getUserInfo) {
    where = "user.username = :username";
    params = { username: getUserInfo.username };
  }
  return [where, params];
};

export class UserService {
  static userExists = async (info: GetUserInfo): Promise<boolean> => {
    const [where, params] = getUserParams(info);

    try {
      return await AppDataSource.getRepository(User)
        .createQueryBuilder("user")
        .where(where, params)
        .getExists();
    } catch (error) {
      console.error(error);
    }

    return false;
  };
  static getUser = async (info: GetUserInfo): Promise<User | undefined> => {
    const [where, params] = getUserParams(info);

    try {
      const user = await AppDataSource.getRepository(User)
        .createQueryBuilder("user")
        .where(where, params)
        .getOneOrFail();
      return user;
    } catch (_) {}
  };

  static createUser = async (email: string): Promise<User | void> => {
    try {
      const userRepo = AppDataSource.getRepository(User);
      const existing = await userRepo.findOne({ where: { email } });
      if (existing) {
        return existing;
      }
      const user = userRepo.create();
      user.email = email;
      user.username = null;
      user.verified = false;
      return await userRepo.save(user);
    } catch (e) {
      console.error(e);
    }
  };

  static deleteUser = async (userId: string) => {
    try {
      await AppDataSource.transaction(async (manager) => {
        const users = manager.getRepository(User);
        const patches = manager.getRepository(Patch);
        const patchStates = manager.getRepository(SavedPatchState);
        const verifications = manager.getRepository(EmailCode);

        const userPatches = (await PatchService.getPatchInfo({
          creatorId: userId,
        })) as PatchInfo[];
        const patchIds = userPatches.map((patch) => patch.id);
        let stateIds: string[] = [];

        if (patchIds.length > 0) {
          const states = await patchStates
            .createQueryBuilder("state")
            .where('"state"."patchId" IN (:...patchIds)', { patchIds })
            .getMany();
          stateIds = states.map((state) => state.id);

          await patches
            .createQueryBuilder()
            .update(Patch)
            .set({ state: null, forkedFrom: null })
            .where("id IN (:...patchIds)", { patchIds })
            .execute();

          await patches
            .createQueryBuilder()
            .update(Patch)
            .set({ forkedFrom: null })
            .where('"forkedFromId" IN (:...patchIds)', { patchIds })
            .execute();

          if (stateIds.length > 0) {
            await patchStates
              .createQueryBuilder()
              .update(SavedPatchState)
              .set({ patch: null, ancestor: null })
              .where("id IN (:...stateIds)", { stateIds })
              .execute();

            await patchStates
              .createQueryBuilder()
              .update(SavedPatchState)
              .set({ ancestor: null })
              .where('"ancestorId" IN (:...stateIds)', { stateIds })
              .execute();
          }
        }

        await patches
          .createQueryBuilder()
          .delete()
          .from(Patch)
          .where('"creatorId" = :userId', { userId })
          .execute();

        if (stateIds.length > 0) {
          await patchStates
            .createQueryBuilder()
            .delete()
            .from(SavedPatchState)
            .where("id IN (:...stateIds)", { stateIds })
            .execute();
        }

        await verifications
          .createQueryBuilder()
          .delete()
          .from(EmailCode)
          .where('"userId" = :userId', { userId })
          .execute();

        await users.delete(userId);
      });
      return true;
    } catch (error) {
      console.error(error);
    }
    return false;
  };
}
