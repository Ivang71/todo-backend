import * as winston from 'winston';
import { Logger, LoggerOptions } from 'winston';
import * as path from 'path';


export class LoggerService {
  private readonly context: any;
  private readonly logger: Logger;
  // private readonly prettyError = new PrettyError();
  public static loggerOptions: LoggerOptions = {
    level: process.env.LOGGER_LEVEL,
    transports: [
      // new winston.transports.Console({
      //   level: process.env.LOGGER_LEVEL,
      //   format: winston.format.combine(
      //     winston.format.colorize({ all: true }),
      //     winston.format.timestamp(),
      //     winston.format.printf((info) => {
      //       return `${info.timestamp}  [${info.level}] [${info.context}] ${info.message}`;
      //     }),
      //   ),
      // }),
      new winston.transports.File({
        filename: path.join(__dirname, `../${process.env.LOG_PATH}/common.log`),
        level: process.env.LOGGER_LEVEL,
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.printf((info) => {
            return `${info.timestamp}  [${info.level}] [${info.context}] ${info.message}`;
          }),
        ),
      }),
    ],
  };

  constructor(context: any, transport?) {
    this.context = context;
    this.logger = (winston as any).createLogger(LoggerService.loggerOptions);
    // this.prettyError.skipNodeFiles();
    // this.prettyError.skipPackage('express', '@nestjs/common', '@nestjs/core');
  }

  error(message: string, trace?: string) {
    this.logger.error(message, {
      context: this.context,
    });
  }

  log = (message: string) => {
    this.logger.log(message, { context: this.context });
  };

  warn = (message: string) => {
    this.logger.warn(message, { context: this.context });
  };

  info = (message: string) => {
    this.logger.info(message, { context: this.context });
  };
  debug = (message: string) => {
    this.logger.debug(message, { context: this.context });
  };
}
