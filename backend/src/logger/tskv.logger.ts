import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  private formatMessage(
    level: string,
    message: unknown,
    optionalParams: unknown[] = [],
  ) {
    const fields: Record<string, string> = {
      level,
      timestamp: new Date().toISOString(),
    };

    if (typeof message === 'string') {
      fields.message = message;
    } else {
      fields.message = JSON.stringify(message);
    }

    for (const param of optionalParams) {
      if (param && typeof param === 'object' && !Array.isArray(param)) {
        for (const [key, value] of Object.entries(
          param as Record<string, unknown>,
        )) {
          if (typeof value === 'string') {
            fields[key] = value;
          } else {
            fields[key] = JSON.stringify(value);
          }
        }
      }
    }

    return Object.entries(fields)
      .map(([key, value]) => `${key}=${value}`)
      .join('\t');
  }

  log(message: unknown, ...optionalParams: unknown[]) {
    console.log(this.formatMessage('log', message, optionalParams));
  }

  error(message: unknown, ...optionalParams: unknown[]) {
    console.error(this.formatMessage('error', message, optionalParams));
  }

  warn(message: unknown, ...optionalParams: unknown[]) {
    console.warn(this.formatMessage('warn', message, optionalParams));
  }

  debug?(message: unknown, ...optionalParams: unknown[]) {
    console.debug(this.formatMessage('debug', message, optionalParams));
  }

  verbose?(message: unknown, ...optionalParams: unknown[]) {
    console.log(this.formatMessage('verbose', message, optionalParams));
  }
}
