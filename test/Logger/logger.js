const winston = require('winston');
const path = require('path');
const { combine, timestamp, printf } = winston.format;

// Use an environment variable to determine the log file name
const logFileName = process.env.LOG_FILE_NAME || 'default_log';

// Define the full path for the log file
const logFilePath = path.join(
    'C:/Repository/WebdriverIO/Solflare/Reports',
    `${logFileName}.log`
);

// Custom format for log messages
const customFormat = printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
});

// Create the logger with dynamic file name from the environment variable
const logger = winston.createLogger({
    level: 'info', // Default log level
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        customFormat
    ),
    transports: [
        new winston.transports.Console(), // Log to console
        new winston.transports.File({
            filename: logFilePath, // Use the dynamic file path
            format: customFormat,
        }),
    ],
});

module.exports = logger; // Export the logger
