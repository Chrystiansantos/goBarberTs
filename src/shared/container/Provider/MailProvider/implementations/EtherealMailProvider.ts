import nodemailer, { Transporter } from 'nodemailer';
import IMailProvider from '../models/IMailProvider';

export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      // dentro de create transporte irei passar as congis que peguei no ethereal
      // transporter sera responsavel pelas configuracoes de envio
      const transporter = nodemailer.createTransport({
        // host de envio
        host: account.smtp.host,
        // porta de envio
        port: account.smtp.port,
        // se tera securitizacao
        secure: account.smtp.secure,
        //
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
      this.client = transporter;
    });
  }

  async sendMail(to: string, body: string): Promise<void> {
    const message = await this.client.sendMail({
      // quem esta enviado o email
      from: 'Equipe GoBarber <equipe@gobarber.com.br>',
      // para quem sera enviado
      to,
      // assunto
      subject: 'Recuperação de senha',
      // corpo a ser enviado no email
      text: body,
    });
    console.log('Message sent: %s', message.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
