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
                    winston.format.colorize(), // Add colorization to the console
                    winston.format.timestamp(),
                    winston.format.printf((info) => {
                        return `${info.timestamp} [${info.level}]: ${info.message}`;
                    })
                ),
                transports: [
                    new winston.transports.Console(), // Console transport for colored output
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

            // Define custom colors for different log levels
            winston.addColors({
                info: 'green', // Info messages are green
                warn: 'yellow', // Warnings are yellow
                error: 'red', // Errors are red
                debug: 'blue', // Debug messages are blue
            });
        }

        return Logger.instance; // Returns the single instance
    }
}

module.exports = new Logger(); // Ensures only one instance of Logger
