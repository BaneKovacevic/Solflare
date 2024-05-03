// logger.js
const winston = require('winston');
const path = require('path');

const logger = winston.createLogger({
    level: 'info', // You can adjust the logging level as needed
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(
            ({ level, message, timestamp }) => `[${timestamp}] [${level.toUpperCase()}]: ${message}`
        )
    ),
    transports: [
        new winston.transports.File({
            filename: path.join('C:', 'Repository', 'WebdriverIO', 'Solflare', 'Reports', 'webdriverio.log'),
        }),
    ],
});

module.exports = logger;


