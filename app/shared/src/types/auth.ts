export type CodeRequestResponse = {
  success: true | false;
  message: string;
  code?: string;
};

export type VerifyCodeResponse =
  | { jwt: string }
  | { error: string };
