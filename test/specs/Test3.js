const { expect } = require('@wdio/globals')
const SolflarePage = require('C:/Repository/WebdriverIO/Solflare/test/pageobjects/solflare.page.js')
const SolflareCreatePage = require('C:/Repository/WebdriverIO/Solflare/test/pageobjects/solflare.create.page')
const SolflareOnboardPage = require('../pageobjects/solflare.onboard.page')
const SolflareSuccessPage = require('C:/Repository/WebdriverIO/Solflare/test/pageobjects/solflare.success.page.js')
const SolflarePortfolioPage = require('C:/Repository/WebdriverIO/Solflare/test/pageobjects/solflare.portfolio.page.js')
const SolflareWalletManagementPage = require('C:/Repository/WebdriverIO/Solflare/test/pageobjects/solflare.wallet.management.page.js')
const SolflareWalletManagementOptionsPage = require('C:/Repository/WebdriverIO/Solflare/test/pageobjects/solflare.wallet.management.options.page.js')
const SolflareWalletManagementOptionsManageAccountsPage = require('C:/Repository/WebdriverIO/Solflare/test/pageobjects/solflare.wallet.management.options.manage.accounts.page.js')
const logger = require('C:/Repository/WebdriverIO/Solflare/Logger/logger.js')
const { Key } = require('webdriverio')
const assert = require('assert');
const config = require('C:/Repository/WebdriverIO/Solflare/test/config/config.js')

describe('Verify that the correct recovery phrase is copied', () => {
    it('should check main page elements', async () => {
        // Open the login page
        logger.info('Opening the login page')
        await SolflarePage.open()

        // Log the current page URL
        const currentPageUrl = await browser.getUrl()
        logger.info(`Arrived at page: ${currentPageUrl}`)

        // Check visibility of main page elements
        const isAccessWalletButtonVisible = await SolflarePage.accessWalletButton.isDisplayed()
        const isDownloadButtonVisible = await SolflarePage.downloadButton.isDisplayed()
        const isImageVisible = await SolflarePage.Image.isDisplayed()

        // Assert visibility of key elements
        expect(isAccessWalletButtonVisible).toBe(true, '"Access wallet" button should be visible, but it is not.')
        expect(isDownloadButtonVisible).toBe(true, '"Download for" button should be visible, but it is not.')
        expect(isImageVisible).toBe(true, '"Image" should be visible, but it is not.')

        // Log success messages to confirm elements are visible
        logger.info('The "Access wallet" button is visible.')
        logger.info('The "Download for" button is visible.')
        logger.info('The "Image" is visible.')
    });

    it('should check onboard page elements', async () => {
        // Click on the "Access wallet" button to go to the onboarding section
        await SolflarePage.accessWalletButton.click()

        // Wait for onboarding elements to be displayed
        const isNewWalletButtonVisible = await SolflareOnboardPage.newWalletButton.waitForDisplayed({ timeout: 4000 });
        const isWalletButtonVisible = await SolflareOnboardPage.walletButton.waitForDisplayed({ timeout: 4000 });


        // Assert that the onboarding elements are visible
        expect(isNewWalletButtonVisible).toBe(true, '"New Wallet" button should be visible, but it is not.');
        expect(isWalletButtonVisible).toBe(true, '"Wallet" button should be visible, but it is not.');


        // Log success messages to confirm elements are visible
        logger.info('The "New Wallet" button is visible.')
        logger.info('Wallet" button is visible.')

    });

    it('should check new wallet page elements', async () => {
        // Click on the "New Wallet" button to navigate to the new wallet section
        await SolflareOnboardPage.newWalletButton.click()

        // Check visibility of the "Save Phrase" button
        const isSavePhraseButtonVisible = await SolflareCreatePage.savePhraseButton.waitForDisplayed({ timeout: 4000 });

        // Assert that the "Save Phrase" button is visible
        expect(isSavePhraseButtonVisible).toBe(true, '"Save Phrase" button should be visible.')

        // Log success message to confirm visibility
        logger.info('The "Save Phrase Button" is visible.');
    });


    it('should extract text from new wallet page', async () => {
        // Initialize an array to store the extracted text from all paragraphs
        const extractedTexts = [];
        const totalParagraphs = 12; // Define the total number of paragraphs to extract text from

        // Extract text from each paragraph with the specified data-index
        for (let i = 1; i <= totalParagraphs; i++) {
            // Construct the CSS selector to locate the paragraph by data-index
            const paragraphSelector = `p[data-index="${i}"]`;

            // Locate the paragraph element
            const paragraphElement = await $(paragraphSelector);

            // If the paragraph element is not found, throw an error to alert the failure
            if (!paragraphElement) {
                throw new Error(`Paragraph with data-index ${i} not found`);
            }

            // Extract the text content from the located paragraph
            const extractedText = await paragraphElement.getText();

            // Store the extracted text in the array
            extractedTexts.push(extractedText);

            // Log the extracted text for tracing or debugging
            logger.info(`Extracted text from paragraph ${i}: ${extractedText}`);
        }

        // Join all extracted texts into a single space-separated string for further use
        const spaceSeparatedTexts = extractedTexts.join(' ');

        // Log the combined space-separated texts
        logger.info('Space-separated texts:', spaceSeparatedTexts);

        // Split the combined texts into individual words to input into fields
        const inputValues = spaceSeparatedTexts.split(' ');

        // Interact with the Continue button to proceed to the input fields page
        await SolflareCreatePage.phraseIsSaved.click();

        // Define the total number of input fields
        const totalFields = 12;

        // Iterate through the total fields to set the corresponding text
        for (let i = 0; i < totalFields; i++) {
            const inputSelector = `#mnemonic-input-${i}`; // Construct the selector for each input field
            const inputField = await $(inputSelector); // Locate the input field

            // If the field does not exist, throw an error to signal the failure
            if (!inputField) {
                throw new Error(`Input field with id mnemonic-input-${i} not found`);
            }

            const textToInput = inputValues[i]; // Get the corresponding text to input into this field

            // Set the value in the input field
            await inputField.setValue(textToInput);

            // Log the action for debugging
            logger.info(`Entered '${textToInput}' into field ${i + 1}`);
        }
    });
    it('should enter the password', async () => {

        await SolflareCreatePage.continueButton.click();
        const newPassword = config.PASSWORD;
        // Set the new passwords using the Page Object method
        await SolflareCreatePage.setNewPasswords(newPassword, newPassword);
        // Click a button to trigger opening of the new tab
        await SolflareCreatePage.continueButttonFinal.click();
    });
    it('should open solana', async () => {

        await SolflareSuccessPage.solanaButton.click();

        await SolflarePortfolioPage.avatarButton.click();

        const mainWallet = await SolflareWalletManagementPage.mainWalletText.getText();
        // Assert visibility of key elements
        assert.strictEqual(mainWallet, 'Main Wallet', 'The text should be "Main Wallet"');

    });
    it('Verify that the first toggle is disabled', async () => {

        await SolflareWalletManagementPage.plusButton.click();

        await SolflareWalletManagementOptionsPage.recoveryPhraseButton.click();

        // Create a list of all switch elements


        // Ensure there are elements in the list
        // Ensure the list is not empty
        if (SolflareWalletManagementOptionsManageAccountsPage.switches.length === 0) {
            throw new Error("No switches found");
        }

        const firstSwitch = SolflareWalletManagementOptionsManageAccountsPage.switches[0];
        const firstSwitchState = await firstSwitch.getAttribute('aria-checked');
        assert.strictEqual(firstSwitchState, 'true', 'The third switch should be checked');
        const isDisabled = await firstSwitch.isEnabled();
        assert.strictEqual(isDisabled, false, 'The switch button should be disabled');
        // Interact with the third switch
        const thirdSwitch = SolflareWalletManagementOptionsManageAccountsPage.switches[2];
        await thirdSwitch.click(); // Click the first switch to toggle its state
        // Example assertion to check if the switch is checked
        const thirdSwitchState = await thirdSwitch.getAttribute('aria-checked');
        assert.strictEqual(thirdSwitchState, 'true', 'The third switch should be checked');
        // Interact with the fourth switch
        const fourthSwitch = SolflareWalletManagementOptionsManageAccountsPage.switches[3];
        await fourthSwitch.click(); // Click the first switch to toggle its state
        // Example assertion to check if the switch is checked
        const fourthSwitchState = await fourthSwitch.getAttribute('aria-checked');
        assert.strictEqual(fourthSwitchState, 'true', 'The fourth switch should be checked');

        // Click the button to trigger the expected action
        await SolflareWalletManagementOptionsManageAccountsPage.saveButton.click();
        await browser.pause(1000);

        // Get the count of wallet items
        const walletItems = await SolflareWalletManagementOptionsManageAccountsPage.myWallets.length;
        console.log(`Number of items in the list: ${walletItems}`);

        // Optionally, assert the expected number of items
        const expectedItemCount = 3; // Change to your expected count
        assert.strictEqual(walletItems, expectedItemCount, `Expected ${expectedItemCount} items in the list`);
    });
})