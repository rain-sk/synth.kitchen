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
  } else if ("userId" in info) {
    where = "email_verification_request.userId = :userId";
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
        .leftJoinAndSelect("email_verification_request.user", "user")
        .getOneOrFail();
    } catch (error) {
      console.error(error);
    }
  };
  static verify = async (key: string) => {
    try {
      const verification = await this.getVerification({ id: key });

      const verifications = AppDataSource.getRepository(
        EmailVerificationRequest
      );
      const users = AppDataSource.getRepository(User);
      const user = await users.findOneOrFail({
        where: { id: verification.user.id },
      });
      user.verified = true;
      await users.save(user);
      const result = await verifications.delete(verification);
      return result.affected === 1;
    } catch (error) {
      console.error(error);
    }
    return false;
  };

  static initiateVerification = async (user: User) => {
    let verification: EmailVerificationRequest | undefined;

    const verifications = AppDataSource.getRepository(EmailVerificationRequest);
    await verifications.delete({ user });

    try {
      await AppDataSource.transaction(async (manager) => {
        const verifications = manager.getRepository(EmailVerificationRequest);
        const users = manager.getRepository(User);
        user = await users.findOneOrFail({ where: { email: user.email } });
        const verification = verifications.create();
        verification.user = user;
        await verifications.save(verification);
      });
    } catch (e) {
      console.error(e);
    }

    verification = await this.getVerification({ userId: user.id });

    if (verification && verification.id) {
      try {
        await sendVerificationEmail(user.email, {
          appOrigin,
          verificationKey: verification.id,
        });
      } catch (e) {
        console.error(e);
      }
    } else {
      console.error("Failed to initiate account verification.");
    }
  };
}
