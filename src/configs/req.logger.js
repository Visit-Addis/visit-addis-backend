import logger from "./wins.logger.js";

const morganFormat = ":remote-user :remote-addr :method :url :status";

const stream = {
  write: (data) => {
    const match = data.trim().match(/^(\S+) (\S+) (\S+) (\S+) (\d{3})$/);
    if (!match) return;
    const [, userName, ipAddress, method, url, status] = match;

    logger.httpLogger.info("HTTP Access Log", {
      user: userName === "-" ? "anonymous" : userName,
      ip: ipAddress,
      method,
      url,
      status: Number(status),
      timeStamp: new Date().toISOString(),
    });
  },
};

export { morganFormat, stream };
