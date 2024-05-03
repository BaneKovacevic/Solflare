// logger.js
const winston = require('winston');
const path = require('path');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json() // Output in JSON format
    ),
    transports: [
        new winston.transports.File({
            filename: path.join('C:', 'Repository', 'WebdriverIO', 'Solflare', 'Reports', 'webdriverio.json'),
        }),
    ],
});

module.exports = logger;
