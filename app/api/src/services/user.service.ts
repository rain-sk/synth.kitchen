import { compare, hash } from "bcrypt";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { validateRegistration, ValidationError } from "./validate/registration";
import { bcryptCost } from "../env";
import { VerificationService } from "./verification.service";
import { Sample } from "../entity/Sample";
import { EmailVerificationRequest } from "../entity/EmailVerificationRequest";
import { PasswordResetRequest } from "../entity/PasswordResetRequest";
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
    } catch (error) {
      console.error(error);
    }
  };

  static login = async (
    emailOrUsername: string,
    password: string
  ): Promise<User | void> => {
    let user: User;
    try {
      user = await this.getUser({
        email: emailOrUsername,
      });
      if (!user) {
        user = await this.getUser({ username: emailOrUsername });
      }
    } catch (e) {
      console.error(e);
    }

    if (user && (await compare(password, user.password))) {
      return user;
    }
  };

  static register = async ({
    email,
    username,
    password,
  }: {
    email: string;
    username?: string;
    password: string;
  }): Promise<User | ValidationError | void> => {
    let user: User | void = await this.login(email, password);

    if (user) {
      return user;
    }

    try {
      await AppDataSource.transaction(async (manager) => {
        await validateRegistration(manager)(email, username, password);
        const userRepository = manager.getRepository(User);
        user = await userRepository.create();
        user.email = email;
        user.username = username ?? email;
        user.password = await hash(password, bcryptCost);
        await userRepository.save(user);
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        return error;
      } else {
        console.error(error);
      }
    }

    if (user) {
      VerificationService.initiateVerification(user);

      return user;
    }
  };

  static deleteUser = async (userId: string) => {
    try {
      await AppDataSource.transaction(async (manager) => {
        const users = manager.getRepository(User);
        const patches = manager.getRepository(Patch);
        const patchStates = manager.getRepository(SavedPatchState);
        const passwordResets = manager.getRepository(PasswordResetRequest);
        const verifications = manager.getRepository(EmailVerificationRequest);
        // const samples = manager.getRepository(Sample);

        const userPatches = (await PatchService.getPatchInfo({
          creatorId: userId,
        })) as PatchInfo[];

        await Promise.all(
          userPatches.map((patch) => patchStates.delete({ patch }))
        );
        await Promise.all(userPatches.map((patch) => patches.delete(patch.id)));

        const user = await this.getUser({ id: userId });
        passwordResets.delete({ user });
        verifications.delete({ user });
        users.delete(userId);
      });
      return true;
    } catch (error) {
      console.error(error);
    }
    return false;
  };
}
