export interface ILogger {
  info<T>(message: string, ...optionalParams: T[]): void;
  warn<T>(message: string, ...optionalParams: T[]): void;
  error<T>(message: string, ...optionalParams: T[]): void;
  setContextInfo(info: string): void;
}