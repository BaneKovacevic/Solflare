const { expect } = require('@wdio/globals')
const LoginPage = require('../pageobjects/login.page')
const SecurePage = require('../pageobjects/secure.page')
const logger = require('./logger')

describe('My Login application', () => {
    it('should check main page elements', async () => {
        // Open the login page
        logger.info('Opening the login page');
        await SolflarePage.open();

        // Log the current page URL
        const currentPageUrl = await browser.getUrl();
        logger.info(`Arrived at page: ${currentPageUrl}`);

        // Check visibility of main page elements
        const isAccessWalletButtonVisible = await SolflarePage.accessWalletButton.isDisplayed();
        const isDownloadButtonVisible = await SolflarePage.downloadButton.isDisplayed();
        const isImageVisible = await SolflarePage.Image.isDisplayed();

        // Assert visibility of key elements
        expect(isAccessWalletButtonVisible).toBe(true, '"Access wallet" button should be visible, but it is not.');
        expect(isDownloadButtonVisible).toBe(true, '"Download for" button should be visible, but it is not.');
        expect(isImageVisible).toBe(true, '"Image" should be visible, but it is not.');

        // Log success messages to confirm elements are visible
        logger.info('The "Access wallet" button is visible.');
        logger.info('The "Download for" button is visible.');
        logger.info('The "Image" is visible.');
    });
});

