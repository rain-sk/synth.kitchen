import { createTransport } from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { appOrigin } from "../env";

const smtpHost = process.env.SMTP_HOST || "";
const smtpPort = parseInt(process.env.SMTP_PORT || "587");
const smtpUsername = process.env.SMTP_USERNAME || "";
const smtpPassword = process.env.SMTP_PASSWORD || "";
const transactionalEmail = process.env.TRANSACTIONAL_EMAIL || "";

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

export const sendResetPasswordEmail = transporter
  ? (to: string, key: string) =>
      new Promise((resolve, reject) => {
        const resetUrl = `${appOrigin}/reset-password/${key}`;
        const mailOptions: Mail.Options = {
          ...defaultMailOptions,
          to,
          subject: "Reset your password at synth.kitchen",
          text: `
            Reset your password

            Copy the URL below and paste it into your browser to reset your synth.kitchen password:

            ${resetUrl}`,
          html: `
            <html>
            <body>
              <h1>Reset your password</h1>
              <p><a href="${resetUrl}">Click to reset your password</a>.</p>
              <p>Or copy the link below and paste it into your browser:</p>
              <p><b><i>${resetUrl}</i></b></p>
            </body>
            </html>`,
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

export const sendPasswordChangedEmail = transporter
  ? (to: string) =>
      new Promise((resolve, reject) => {
        const resetUrl = `${appOrigin}/reset-password/`;
        const mailOptions: Mail.Options = {
          ...defaultMailOptions,
          to,
          subject: "Your password at synth.kitchen was updated",
          text: `Your password at synth.kitchen was updated. If this wasn't you, then click the link below to update your password.
          
          ${resetUrl}`,
          html: `
            <html>
            <body>
              <h1>Your password was updated</h1>
              <p>Your password at synth.kitchen was updated. If this was you, please carry on.
              <p>If you didn't recently change your password, then <a href="${resetUrl}">click here to reset your password<a/>, or copy the link below and paste it into your browser:</p>
              <p><b><i>${resetUrl}</i></b></p>
            </body>
            </html>`,
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
