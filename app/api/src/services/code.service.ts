import { createHash, randomInt } from "crypto";
import { AppDataSource } from "../data-source";
import { EmailCode } from "../entity/EmailCode";
import { User } from "../entity/User";
import { UserService } from "./user.service";
import { sendCodeEmail } from "../utils/send-email";
import { jwtSign } from "../utils/jwt-sign";
import { appOrigin } from "../env";

const CODE_TTL_MS = 10 * 60 * 1000;
const CODE_LENGTH = 6;

export const normalizeEmail = (email: string) => email.trim().toLowerCase();

const hashCode = (code: string, userId: string) =>
  createHash("sha256").update(`${code}:${userId}`).digest("hex");

const generateCode = () =>
  String(randomInt(0, 1_000_000)).padStart(CODE_LENGTH, "0");

const testEchoEnabled = () => process.env.TEST_CODE_ECHO === "1";

export class CodeService {
  static requestCode = async (email: string): Promise<{ echoCode?: string } | void> => {
    const user = await UserService.createUser(normalizeEmail(email));
    if (!user) {
      return;
    }

    const code = generateCode();
    const codeHash = hashCode(code, user.id);

    try {
      const repo = AppDataSource.getRepository(EmailCode);
      await repo
        .createQueryBuilder()
        .delete()
        .from(EmailCode)
        .where('"userId" = :userId', { userId: user.id })
        .execute();
      const emailCode = repo.create({
        codeHash,
        expiresAt: new Date(Date.now() + CODE_TTL_MS),
        user,
      });
      await repo.save(emailCode);

      await sendCodeEmail(user.email, {
        code,
        appOrigin,
      });
      return testEchoEnabled() ? { echoCode: code } : undefined;
    } catch (e) {
      console.error(e);
    }
  };

  static verifyCode = async (email: string, code: string): Promise<{ jwt: string } | { error: string }> => {
    let user: User | undefined;
    try {
      user = await UserService.getUser({ email: normalizeEmail(email) });
    } catch (e) {
      console.error(e);
    }
    if (!user) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return { error: "Something went wrong, try again." };
    }

    const repo = AppDataSource.getRepository(EmailCode);
    let emailCode: EmailCode | undefined;
    try {
      emailCode = await repo.findOne({
        where: { user: { id: user.id } },
        order: { createdAt: "DESC" },
      });
    } catch (e) {
      console.error(e);
    }

    if (!emailCode || emailCode.expiresAt < new Date()) {
      return { error: "Something went wrong, try again." };
    }

    const valid =
      hashCode(code, user.id) === emailCode.codeHash;

    if (!valid) {
      await repo.delete(emailCode.id);
      return { error: "Something went wrong, try again." };
    }

    try {
      await repo.delete(emailCode.id);
      user.verified = true;
      await AppDataSource.getRepository(User).save(user);
    } catch (e) {
      console.error(e);
      return { error: "Something went wrong, try again." };
    }

    const jwt = await jwtSign(user);
    return { jwt };
  };
}
