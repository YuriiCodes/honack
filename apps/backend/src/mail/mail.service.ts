import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import sgMail from '@sendgrid/mail';


@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {
    sgMail.setApiKey(this.configService.get<string>('SEND_GRID_KEY'));
  }

  async send(mail: sgMail.MailDataRequired) {
    const transport = await sgMail.send(mail);
    console.log(`E-Mail sent to ${mail.to}`);
    return transport;
  }
}
