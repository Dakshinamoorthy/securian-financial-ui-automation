import { configure, getLogger } from 'log4js';

const log4jsConfig = {
  appenders: { default: { type: 'file', filename: 'logs/application.log' } },
  categories: { default: { appenders: ['default'], level: 'debug' } }
};

configure(log4jsConfig);

const logger = getLogger();

export default logger;
