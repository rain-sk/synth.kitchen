import { AppDataSource } from "../data-source";
import { EmailVerificationRequest } from "../entity/EmailVerificationRequest";
import { User } from "../entity/User";
import { sendVerificationEmail } from "../utils/email";
import { appOrigin } from "../env";

type GetVerificationInfo = { id: string } | { userId: string };
const getVerificationParams = (
  info: GetVerificationInfo
): [string, GetVerificationInfo] => {
  let where: string;
  let params: GetVerificationInfo;
  if ("id" in info) {
    where = "email_verification_request.id = :id";
    params = { id: info.id };
  } else if ("email" in info) {
    where = "email_verification_request.user = :userId";
    params = { userId: info.userId };
  }
  return [where, params];
};

export class VerificationService {
  static getVerification = async (info: GetVerificationInfo) => {
    const [where, params] = getVerificationParams(info);

    try {
      return await AppDataSource.getRepository(EmailVerificationRequest)
        .createQueryBuilder("email_verification_request")
        .where(where, params)
        .getOneOrFail();
    } catch (error) {
      console.error(error);
    }
  };

  static initiateVerification = async (user: User) => {
    try {
      await AppDataSource.transaction(async (manager) => {
        const repository = await manager.getRepository(
          EmailVerificationRequest
        );
        const verification = repository.create();
        verification.user = user;
        repository.save(verification);
      });
    } catch (e) {
      console.error(e);
    }

    const verification = await this.getVerification({ userId: user.id });

    if (verification && verification.id) {
      await sendVerificationEmail(user.email, {
        appOrigin,
        verificationKey: verification.id,
      });
    } else {
      console.error("Failed to initiate account verification.");
    }
  };
}
