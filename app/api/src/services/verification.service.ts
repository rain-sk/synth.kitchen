import { AppDataSource } from "../data-source";
import { EmailVerificationRequest } from "../entity/EmailVerificationRequest";
import { User } from "../entity/User";
import { sendVerificationEmail } from "../utils/send-email";
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
    let verification: EmailVerificationRequest | undefined;

    try {
      await AppDataSource.transaction(async (manager) => {
        const verifications = manager.getRepository(EmailVerificationRequest);
        const users = manager.getRepository(User);
        user = await users.findOneOrFail({ where: { email: user.email } });
        const verification = verifications.create();
        verification.user = user;
        user.emailVerificationRequest = verification;
        await verifications.save(verification);
        await users.save(user);
      });
    } catch (e) {
      console.error(e);
    }

    verification = await this.getVerification({ userId: user.id });

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
