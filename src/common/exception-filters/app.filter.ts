import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { BaseExceptionFilter } from '@nestjs/core';
import { ExceptionReqDto, ExceptionResDto } from './dto';
import { ConfigService } from '@nestjs/config';
import pino from 'pino';

@Catch()
export class AppFilter extends BaseExceptionFilter {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  async catch(exception: HttpException, host: ArgumentsHost) {
    super.catch(exception, host);
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const pinoReq = new ExceptionReqDto(
      pino.stdSerializers.mapHttpRequest(request).req,
    );
    const pinoRes = new ExceptionResDto(
      pino.stdSerializers.mapHttpResponse(response).res,
    );
    // await this.sendToTelegram(pinoReq, pinoRes);
  }

  private async sendToTelegram(
    pinoReq: ExceptionReqDto,
    pinoRes: ExceptionResDto,
  ) {
    const text = `An error occurred while requesting the path ${
      pinoReq.url
    } req: ${JSON.stringify(pinoReq)}\n\nres: ${JSON.stringify(pinoRes)})`;
    try {
      await this.httpService.axiosRef.get(
        `https://api.telegram.org/bot${this.configService.get<string>(
          'TELEGRAM_TOKEN',
        )}/sendMessage?chat_id=${this.configService.get<string>(
          'TELEGRAM_CHATID',
        )}&text=${text}`,
      );
    } catch (error) {
      console.error('Error sending to telegram', error);
    }
  }
}
