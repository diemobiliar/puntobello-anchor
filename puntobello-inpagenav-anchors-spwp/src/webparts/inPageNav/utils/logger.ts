import { ILogger } from "../models";

enum LogLevel {
    Info = 'info',
    Warn = 'warn',
    Error = 'error'
}

export class Logger implements ILogger {
    private static instance: Logger;
    private isVerbose: boolean;
    private contextInfo: string;
    private figletOutpout = false;
    private welcomeFiglet = `\u001b[31m \u001b[33m \u001b[33m_\u001b[32m_\u001b[34m_\u001b[35m_\u001b[36m \u001b[31m \u001b[33m \u001b[33m \u001b[32m \u001b[34m \u001b[35m \u001b[36m \u001b[31m \u001b[33m \u001b[33m \u001b[32m \u001b[34m \u001b[35m \u001b[36m_\u001b[31m \u001b[33m \u001b[33m \u001b[32m \u001b[34m \u001b[35m \u001b[36m \u001b[31m \u001b[33m_\u001b[33m_\u001b[32m_\u001b[34m_\u001b[35m \u001b[36m \u001b[31m \u001b[33m \u001b[33m \u001b[32m \u001b[34m \u001b[35m_\u001b[36m \u001b[31m_\u001b[33m \u001b[33m \u001b[32m \u001b[34m \u001b[35m \u001b[36m \u001b[31m \u001b[0m\n\u001b[33m \u001b[33m|\u001b[32m \u001b[34m \u001b[35m_\u001b[36m \u001b[31m\\\u001b[33m \u001b[33m_\u001b[32m \u001b[34m \u001b[35m \u001b[36m_\u001b[31m \u001b[33m_\u001b[33m \u001b[32m_\u001b[34m_\u001b[35m \u001b[36m|\u001b[31m \u001b[33m|\u001b[33m_\u001b[32m \u001b[34m_\u001b[35m_\u001b[36m_\u001b[31m \u001b[33m|\u001b[33m \u001b[32m_\u001b[34m_\u001b[35m \u001b[36m)\u001b[31m \u001b[33m \u001b[33m_\u001b[32m_\u001b[34m_\u001b[35m|\u001b[36m \u001b[31m|\u001b[33m \u001b[33m|\u001b[32m \u001b[34m_\u001b[35m_\u001b[36m_\u001b[31m \u001b[33m \u001b[0m\n\u001b[33m \u001b[32m|\u001b[34m \u001b[35m|\u001b[36m_\u001b[31m)\u001b[33m \u001b[33m|\u001b[32m \u001b[34m|\u001b[35m \u001b[36m|\u001b[31m \u001b[33m|\u001b[33m \u001b[32m'\u001b[34m_\u001b[35m \u001b[36m\\\u001b[31m|\u001b[33m \u001b[33m_\u001b[32m_\u001b[34m/\u001b[35m \u001b[36m_\u001b[31m \u001b[33m\\\u001b[33m|\u001b[32m \u001b[34m \u001b[35m_\u001b[36m \u001b[31m\\\u001b[33m \u001b[33m/\u001b[32m \u001b[34m_\u001b[35m \u001b[36m\\\u001b[31m \u001b[33m|\u001b[33m \u001b[32m|\u001b[34m/\u001b[35m \u001b[36m_\u001b[31m \u001b[33m\\\u001b[33m \u001b[0m\n\u001b[32m \u001b[34m|\u001b[35m \u001b[36m \u001b[31m_\u001b[33m_\u001b[33m/\u001b[32m|\u001b[34m \u001b[35m|\u001b[36m_\u001b[31m|\u001b[33m \u001b[33m|\u001b[32m \u001b[34m|\u001b[35m \u001b[36m|\u001b[31m \u001b[33m|\u001b[33m \u001b[32m|\u001b[34m|\u001b[35m \u001b[36m(\u001b[31m_\u001b[33m)\u001b[33m \u001b[32m|\u001b[34m \u001b[35m|\u001b[36m_\u001b[31m)\u001b[33m \u001b[33m|\u001b[32m \u001b[34m \u001b[35m_\u001b[36m_\u001b[31m/\u001b[33m \u001b[33m|\u001b[32m \u001b[34m|\u001b[35m \u001b[36m(\u001b[31m_\u001b[33m)\u001b[33m \u001b[32m|\u001b[0m\n\u001b[34m \u001b[35m|\u001b[36m_\u001b[31m|\u001b[33m \u001b[33m \u001b[32m \u001b[34m \u001b[35m\\\u001b[36m_\u001b[31m_\u001b[33m,\u001b[33m_\u001b[32m|\u001b[34m_\u001b[35m|\u001b[36m \u001b[31m|\u001b[33m_\u001b[33m|\u001b[32m\\\u001b[34m_\u001b[35m_\u001b[36m\\\u001b[31m_\u001b[33m_\u001b[33m_\u001b[32m/\u001b[34m|\u001b[35m_\u001b[36m_\u001b[31m_\u001b[33m_\u001b[33m/\u001b[32m \u001b[34m\\\u001b[35m_\u001b[36m_\u001b[31m_\u001b[33m|\u001b[33m_\u001b[32m|\u001b[34m_\u001b[35m|\u001b[36m\\\u001b[31m_\u001b[33m_\u001b[33m_\u001b[32m/\u001b[34m \u001b[0m\n\u001b[35m \u001b[36m \u001b[31m \u001b[33m \u001b[33m \u001b[32m \u001b[34m \u001b[35m \u001b[36m \u001b[31m \u001b[33m \u001b[33m \u001b[32m \u001b[34m \u001b[35m \u001b[36m \u001b[31m \u001b[33m \u001b[33m \u001b[32m \u001b[34m \u001b[35m \u001b[36m \u001b[31m \u001b[33m \u001b[33m \u001b[32m \u001b[34m \u001b[35m \u001b[36m \u001b[31m \u001b[33m \u001b[33m \u001b[32m \u001b[34m \u001b[35m \u001b[36m \u001b[31m \u001b[33m \u001b[33m \u001b[32m \u001b[34m \u001b[35m \u001b[36m \u001b[31m \u001b[33m \u001b[33m \u001b[32m \u001b[34m \u001b[35m \u001b[0m\n`;

    private constructor() {
        const url = new URL(window.location.href);
        const urlParams = new URLSearchParams(url.search);
        this.isVerbose = urlParams.get('debug') === 'true' || urlParams.get('loadSPFX') === 'true' || window.location.href.indexOf('workbench.aspx') !== -1;
    }

    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    public setContextInfo(info: string) {
        this.contextInfo = info;
    }

    public info<T>(message: string, ...optionalParams: T[]): void {
        if (this.isVerbose) {
            this.customLog(LogLevel.Info, message, ...optionalParams);
        }
    }

    public warn<T>(message: string, ...optionalParams: T[]): void {
        this.customLog(LogLevel.Warn, message, ...optionalParams);
    }

    public error<T>(message: string, ...optionalParams: T[]): void {
        this.customLog(LogLevel.Error, message, ...optionalParams);
        console.trace('Stack Trace:');
    }

    private customLog<T>(level: LogLevel, message: string, ...optionalParams: T[]): void {
        this.writeWelcomeFiglet();
        const icon = level === LogLevel.Error ? '🐞' :
            level === LogLevel.Warn ? '🔔' :
                level === LogLevel.Info ? 'ℹ️' : '';
        const color = level === LogLevel.Error ? 'color: red;' :
            level === LogLevel.Warn ? 'color: orange;' :
                level === LogLevel.Info ? 'color: blue;' : '';
        const prefix = `%c${icon} [${level.toUpperCase()}]:`;
        const style = `${color} font-weight: bold;`;

        const logFunction = console[level] || console.log;

        const params = this.contextInfo ? [`${prefix}`, style, this.contextInfo, message, ...optionalParams] : [`${prefix}`, style, message, ...optionalParams];

        logFunction(...params);
    }

    private writeWelcomeFiglet() {
        if (!this.figletOutpout) {
            console.log(this.welcomeFiglet);
            this.figletOutpout = true;
        }
    }
}
