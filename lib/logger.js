'use strict'

/**
 * MailDev - logger.js
 */

let loggerInstance = null;

function createLogger(loggerProvider) {
  if (loggerInstance) {
    return loggerInstance;
  }

  const methods = ['log', 'dir', 'warn', 'error', 'info'];
  const logger = {};

  methods.forEach(function (fn) {
    if (loggerProvider === null) {
      logger[fn] = function () {
        console[fn].apply(console, arguments);
      };
    } else if (typeof loggerProvider === "function") {
      logger[fn] = function () {
        loggerProvider(fn, arguments);
      };
    }
  });

  loggerInstance = logger;

  return logger;
}

function getLogger() {
  if (loggerInstance === null) {
    throw new Error('Logger not initialized. Please call createLogger() first.');
  }
  return loggerInstance;
}

module.exports = {
  createLogger,
  getLogger
};
