import { format, transports, createLogger, addColors } from "winston";
const { combine, timestamp, json, simple, colorize } = format;

addColors({
  error: "red bold",
  warn: "yellow bold",
  info: "cyan bold",
  http: "magenta bold",
  debug: "blue bold",
});

const consoleTransport = new transports.Console({
  format: combine(colorize({ all: true }), simple()),
});

const httpLogger = createLogger({
  level: "http",
  format: json(),
  transports: [consoleTransport],
});

const errorLogger = createLogger({
  level: "error",
  format: combine(json(), timestamp()),
  transports: [consoleTransport],
});

const emailLogger = createLogger({
  level: "info",
  format: combine(json(), timestamp()),
  transports: [consoleTransport],
});

const infoLogger = createLogger({
  level: "info",
  format: combine(colorize({ all: true })),
  transports: [consoleTransport],
});

export default { httpLogger, errorLogger, emailLogger, infoLogger };
