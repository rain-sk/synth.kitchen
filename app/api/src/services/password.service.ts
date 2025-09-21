import { AppDataSource } from "../data-source";
import { PasswordResetRequest } from "../entity/PasswordResetRequest";
import {
  sendPasswordChangedEmail,
  sendResetPasswordEmail,
} from "../utils/send-email";
import { UserService } from "./user.service";
import { appOrigin, bcryptCost } from "../env";
import { User } from "../entity/User";
import { hash } from "bcrypt";

export class PasswordService {
  static requestReset = async (email: string) => {
    await AppDataSource.transaction(async (manager) => {
      const user = await UserService.getUser({ email });
      const passwordResetRepository =
        manager.getRepository(PasswordResetRequest);
      await manager
        .createQueryBuilder()
        .delete()
        .from(PasswordResetRequest)
        .where("user = :user", { user: user.id })
        .execute();
      const passwordResetRequest = await passwordResetRepository.create();
      passwordResetRequest.user = user;
      await passwordResetRepository.save(passwordResetRequest);
      await sendResetPasswordEmail(email, {
        appOrigin,
        resetKey: passwordResetRequest.id,
      });
    });
  };

  static resetPassword = async (password: string, resetKey: string) => {
    await AppDataSource.transaction(async (manager) => {
      const requestRepository = manager.getRepository(PasswordResetRequest);
      const request = await requestRepository.findOneOrFail({
        where: { id: resetKey },
        relations: { user: true },
      });
      const userRepository = manager.getRepository(User);
      const user = await UserService.getUser({ email: request.user.email });
      user.password = await hash(password, bcryptCost);
      await userRepository.save(user);
      await requestRepository.remove(request);
      await sendPasswordChangedEmail(user.email, {
        appOrigin,
      });
    });
  };
}
