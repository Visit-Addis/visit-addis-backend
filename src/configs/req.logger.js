import logger from "./wins.logger.js";

const morganFormat = ":remote-user :remote-addr :method :url :status";

const stream = {
  write: (data) => {
    const [userName, ipAddress, method, url, status] = data.trim().split(" ");
    logger.httpLogger.info("HTTP Access Log", {
      userName: userName === "-" ? "anonymous" : userName,
      ipAddress,
      method,
      url,
      status: Number(status),
      timeStamp: new Date().toISOString(),
    });
  },
};

export { morganFormat, stream };
