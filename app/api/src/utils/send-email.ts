import { createTransport, SendMailOptions } from "nodemailer";
import {
  mailEnabled,
  smtpHost,
  smtpPassword,
  smtpPort,
  smtpUsername,
  transactionalEmail,
} from "../env";

const transporter =
  smtpHost && mailEnabled
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

if (smtpHost && !mailEnabled) {
  console.log(
    "mail: disabled (NODE_ENV is not production). Set MAIL_ENABLED=1 to send from this box.",
  );
}

// Configure the mailoptions object
const defaultMailOptions: Omit<SendMailOptions, "to" | "subject" | "text"> = {
  from: transactionalEmail,
};

export const sendEmail = transporter
  ? (options: Omit<SendMailOptions, "from">) =>
      new Promise((resolve, reject) => {
        const mailOptions: SendMailOptions = {
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

      const mailOptions: SendMailOptions = {
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

export const sendCodeEmail = makeEmailer<{
  appOrigin: string;
  code: string;
}>(
  "Your synth.kitchen sign-in code",
  `Your sign-in code is: :code

It expires in 10 minutes. Do not share it with anyone.`,
  `
<html>
<body>
  <h1>Your synth.kitchen sign-in code</h1>
  <p>Your one-time code is:</p>
  <p><b>:code</b></p>
  <p>It expires in 10 minutes. Do not share it.</p>
</body>
</html>`
);
