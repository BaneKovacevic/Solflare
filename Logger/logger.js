const winston = require('winston');

// Set up a custom logger
const logger = winston.createLogger({
    level: 'info', // Log level to control the verbosity
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple() // Simple output format
    ),
    transports: [
        new winston.transports.Console(), // Log to console
        new winston.transports.File({ filename: 'custom_log.log' }) // Log to a custom file
    ],
});

module.exports = logger; // Export the logger

