import { appConfig } from "../config/appConfig.js";

type LogLevel = "info" | "warn" | "error" | "debug";

function writeLog(level: LogLevel, message: string, meta?: unknown): void {

    const timestamp = new Date().toISOString();

    const logEntry = {
        timestamp,
        level,
        message,
        meta,
    }

    console.error(JSON.stringify(logEntry));

}

export const logger = {
    info(message: string, meta?: unknown): void {
        writeLog("info", message, meta);
    },

    warn(message: string, meta?: unknown): void {
        writeLog("warn", message, meta);
    },

    error(message: string, meta?: unknown): void {
        writeLog("error", message, meta);
    },

    debug(message: string, meta?: unknown): void {
        if (appConfig.nodeEnv === "development") {
            writeLog("debug", message, meta);
        }
    },
};