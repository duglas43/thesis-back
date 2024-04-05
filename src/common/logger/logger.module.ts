import { Module } from "@nestjs/common";
import { LoggerModule as PinoLoggerModule } from "nestjs-pino";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { stdTimeFunctions } from "pino";
import { UserDto } from "src/users/dto";
import { AbilityRuleDto } from "src/casl/dto";

// if NODE_ENV is development, then autoLogging and file logs are disabled. Only console logs are printed
// if LOG_LEVEL is not set, then all logs will be printed. Otherwise, only logs with the specified level will be printed
@Module({
  imports: [
    PinoLoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        pinoHttp: {
          level: "trace",
          timestamp: stdTimeFunctions.isoTime,
          transport: {
            targets: [
              {
                target: "pino-pretty",
              },
              {
                level: "trace",
                target: "pino/file",
                options: {
                  destination: "logs/logs.json",
                },
              },
              {
                level: "error",
                target: "pino/file",
                options: {
                  destination: "logs/errors.json",
                },
              },
            ],
          },
          customProps(req) {
            return {
              user: new UserDto(req?.["user"]),
              abilityRules: req?.["ability"]
                ? req["ability"]?.rules.map((rule) => new AbilityRuleDto(rule))
                : [],
            };
          },
          redact: {
            paths: [
              "req.headers.authorization",
              "req.headers.cookie",
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
