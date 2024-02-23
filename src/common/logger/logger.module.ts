import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { stdTimeFunctions } from 'pino';

// if NODE_ENV is development, then autoLogging and file logs are disabled. Only console logs are printed
// if LOG_LEVEL is not set, then all logs will be printed. Otherwise, only logs with the specified level will be printed
@Module({
  imports: [
    PinoLoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        pinoHttp: {
          level: configService.get('LOG_LEVEL') || 'trace',
          autoLogging: configService.get('NODE_ENV') !== 'development',
          timestamp: stdTimeFunctions.isoTime,
          transport: {
            targets: [
              {
                target: 'pino-pretty',
              },
              {
                level:
                  configService.get('NODE_ENV') === 'development'
                    ? 'silent'
                    : configService.get('LOG_LEVEL') || 'trace',
                target: 'pino/file',
                options: {
                  destination: 'logs.json',
                },
              },
              {
                level:
                  configService.get('NODE_ENV') === 'development'
                    ? 'silent'
                    : 'error',
                target: 'pino/file',
                options: {
                  destination: 'errors.json',
                },
              },
            ],
          },

          redact: {
            paths: [
              'req.headers.authorization',
              'req.headers.cookie',
              'res.headers["set-cookie"]',
            ],
            remove: true,
          },
        },
      }),
    }),
  ],
})
export class LoggerModule {}
