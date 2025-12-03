import { createTransport } from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import {
  smtpHost,
  smtpPassword,
  smtpPort,
  smtpUsername,
  transactionalEmail,
} from "../env";

const transporter = smtpHost
  ? createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: false,
      auth: {
        user: smtpUsername,
        pass: smtpPassword,
      },
      tls: {
        ciphers: "SSLv3",
      },
    })
  : undefined;

// Configure the mailoptions object
const defaultMailOptions: Omit<Mail.Options, "to" | "subject" | "text"> = {
  from: transactionalEmail,
};

export const sendEmail = transporter
  ? (options: Omit<Mail.Options, "from">) =>
      new Promise((resolve, reject) => {
        const mailOptions: Mail.Options = {
          ...defaultMailOptions,
          ...options,
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            reject(error);
          } else {
            resolve(info);
          }
        });
      })
  : async () => {};

const makeEmailer = <
  Vars extends Record<string, string> | undefined = undefined
>(
  subject: string,
  text: string,
  html: string
) => {
  if (!transporter) {
    return async () => {};
  }

  return (to: string, vars: Vars) =>
    new Promise((resolve, reject) => {
      let mutableSubject = subject;
      let mutableText = text;
      let mutableHtml = html;

      for (let key in vars) {
        mutableSubject = mutableSubject.replaceAll(`:${key}`, vars[key]);
        mutableText = mutableText.replaceAll(`:${key}`, vars[key]);
        mutableHtml = mutableHtml.replaceAll(`:${key}`, vars[key]);
      }

      const mailOptions: Mail.Options = {
        ...defaultMailOptions,
        to,
        subject: mutableSubject,
        text: mutableText,
        html: mutableHtml,
      };
      try {
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            reject(error);
          } else {
            resolve(info);
          }
        });
      } catch (e) {
        reject(e);
      }
    });
};

export const sendVerificationEmail = makeEmailer<{
  appOrigin: string;
  verificationKey: string;
}>(
  "Verify your synth.kitchen account",
  `Verify your account

Visit the URL below to verify your synth.kitchen account:

:appOrigin/account/verify/:verificationKey`,
  `
<html>
<body>
  <h1>Verify your account</h1>
  <p><a href=":appOrigin/account/verify/:verificationKey">Click to&nbsp;verify your account</a>.</p>
  <p>Or copy the link below and paste it into your browser:</p>
  <p><b><i>:appOrigin/account/verify/:verificationKey</i></b></p>
</body>
</html>`
);

export const sendResetPasswordEmail = makeEmailer<{
  appOrigin: string;
  resetKey: string;
}>(
  "Reset your password at synth.kitchen",
  `Reset your password

Visit the URL below to reset your synth.kitchen password:

:appOrigin/reset-password/:resetKey`,
  `
<html>
<body>
  <h1>Reset your password</h1>
  <p><a href=":appOrigin/reset-password/:resetKey">Click to reset your password</a>.</p>
  <p>Or copy the link below and paste it into your browser:</p>
  <p><b><i>:appOrigin/reset-password/:resetKey</i></b></p>
</body>
</html>`
);

export const sendPasswordChangedEmail = makeEmailer<{ appOrigin: string }>(
  "Your password at synth.kitchen was updated",
  `Your password at synth.kitchen was updated. If this wasn't you, then visit the link below to update your password.

:appOrigin/reset-password/`,
  `
<html>
<body>
  <h1>Your password was updated</h1>
  <p>Your password at synth.kitchen was updated. If this was you, please carry on.
  <p>If you didn't recently change your password, then <a href=":appOrigin/reset-password/">click here to reset your password<a/>, or copy the link below and paste it into your browser:</p>
  <p><b><i>:appOrigin/reset-password/</i></b></p>
</body>
</html>`
);
