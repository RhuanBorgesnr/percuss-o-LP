import nodemailer from 'nodemailer';
import config from '../config';


const transporter = nodemailer.createTransport({
  host: config.mail.host,
  port: config.mail.port,
  secure: config.mail.secure,
  auth: {
    user: config.mail.auth.user,
    pass: config.mail.auth.pass,
  },
});
console.log(transporter)

export async function enviarEmail(name: string, email: string, message: string) {
  console.log(name)
  
  const info = await transporter.sendMail({
    from: config.mail.from,
    to: config.mail.to,
    subject: `Nova mensagem de ${name} (${email})`,
    text: message,
  });

  console.log(`E-mail enviado: ${info.messageId}`);
}
