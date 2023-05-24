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
      module.exports[fn] = function () {
        console[fn].apply(console, arguments);
      }
    } else if (typeof loggerProvider === "object") {
      if (typeof loggerProvider[fn] !== 'undefined') {
        logger[fn] = function () {
          loggerProvider[fn](arguments);
        };
        module.exports[fn] = function () {
          loggerProvider[fn](arguments);
        }
      } else {
        logger[fn] = function () {
          loggerProvider['info'](arguments);
        };
        module.exports[fn] = function () {
          loggerProvider['info'](arguments);
        }
      }
    }
  });

  loggerInstance = logger;

  return logger;
}

module.exports = {
  createLogger
};
