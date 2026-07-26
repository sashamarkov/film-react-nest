import { JsonLogger } from './json.logger';
import { TskvLogger } from './tskv.logger';

describe('JsonLogger', () => {
  let jsonLogger: JsonLogger;
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jsonLogger = new JsonLogger();
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  it('должен форматировать лог-сообщение в JSON', () => {
    const message = 'test message';
    jsonLogger.log(message);

    expect(consoleLogSpy).toHaveBeenCalled();
    const loggedArg = consoleLogSpy.mock.calls[0][0];
    const parsed = JSON.parse(loggedArg);

    expect(parsed).toMatchObject({
      level: 'log',
      message: message,
    });
    expect(parsed.timestamp).toBeDefined();
  });

  it('должен форматировать сообщение об ошибке в JSON', () => {
    const message = 'error message';
    jsonLogger.error(message);

    expect(consoleErrorSpy).toHaveBeenCalled();
    const loggedArg = consoleErrorSpy.mock.calls[0][0];
    const parsed = JSON.parse(loggedArg);

    expect(parsed).toMatchObject({
      level: 'error',
      message: message,
    });
    expect(parsed.timestamp).toBeDefined();
  });

  it('должен включать дополнительные параметры в JSON', () => {
    const message = 'test message';
    const details = { userId: 123, action: 'login' };
    jsonLogger.log(message, details);

    expect(consoleLogSpy).toHaveBeenCalled();
    const loggedArg = consoleLogSpy.mock.calls[0][0];
    const parsed = JSON.parse(loggedArg);

    expect(parsed).toMatchObject({
      level: 'log',
      message: message,
      details: [details],
    });
  });
});

describe('TskvLogger', () => {
  let tskvLogger: TskvLogger;
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    tskvLogger = new TskvLogger();
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  it('должен форматировать лог-сообщение в TSKV', () => {
    const message = 'test message';
    tskvLogger.log(message);

    expect(consoleLogSpy).toHaveBeenCalled();
    const loggedArg = consoleLogSpy.mock.calls[0][0];

    expect(loggedArg).toContain('level=log');
    expect(loggedArg).toContain(`message=${message}`);
    expect(loggedArg).toContain('timestamp=');
    expect(loggedArg).toMatch(/\t/);
  });

  it('должен форматировать сообщение об ошибке в TSKV', () => {
    const message = 'error message';
    tskvLogger.error(message);

    expect(consoleErrorSpy).toHaveBeenCalled();
    const loggedArg = consoleErrorSpy.mock.calls[0][0];

    expect(loggedArg).toContain('level=error');
    expect(loggedArg).toContain(`message=${message}`);
    expect(loggedArg).toContain('timestamp=');
    expect(loggedArg).toMatch(/\t/);
  });

  it('должен включать свойства объекта как отдельные поля в TSKV', () => {
    const message = 'test message';
    const details = { userId: 123, action: 'login' };
    tskvLogger.log(message, details);

    expect(consoleLogSpy).toHaveBeenCalled();
    const loggedArg = consoleLogSpy.mock.calls[0][0];

    expect(loggedArg).toContain('level=log');
    expect(loggedArg).toContain(`message=${message}`);
    expect(loggedArg).toContain('userId=123');
    expect(loggedArg).toContain('action=login');
    expect(loggedArg).toContain('timestamp=');
    expect(loggedArg).toMatch(/\t/);
  });
});
