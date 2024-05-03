// logger.js
const winston = require('winston');
const path = require('path');
const moment = require('moment');

class Logger {
    constructor() {
        if (!Logger.instance) {
            const uniqueId = moment().format('YYYYMMDD_HHmmss');
            Logger.instance = winston.createLogger({
                level: 'info',
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.json() // Structured JSON logs
                ),
                transports: [
                    new winston.transports.File({
                        filename: path.join(
                            'C:',
                            'Repository',
                            'WebdriverIO',
                            'Solflare',
                            'Reports',
                            `webdriverio_${uniqueId}.json`
                        ),
                    }),
                ],
            });
        }
        return Logger.instance; // Returns the single instance
    }
}
module.exports = new Logger(); // Ensures only one instance of Logger
