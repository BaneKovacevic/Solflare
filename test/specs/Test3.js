// External libraries and utilities
const { expect } = require('@wdio/globals');
const { Key } = require('webdriverio');
const assert = require('assert');
const config = require('../config/config.js');

// Importing the logger
const logger = require('C:/Repository/WebdriverIO/Solflare/Logger/logger');

// Page objects for various parts of the application
const SolflarePage = require('../pageobjects/solflare.page.js'); 
const SolflareCreatePage = require('../pageobjects/solflare.create.page.js');
const SolflareOnboardPage = require('../pageobjects/solflare.onboard.page.js');
const SolflareSuccessPage = require('../pageobjects/solflare.success.page.js');
const SolflarePortfolioPage = require('../pageobjects/solflare.portfolio.page.js');
const SolflareWalletManagementPage = require('../pageobjects/solflare.wallet.management.page.js');
const SolflareWalletManagementOptionsPage = require('../pageobjects/solflare.wallet.management.options.page.js');
const SolflareWalletManagementOptionsManageAccountsPage = require('../pageobjects/solflare.wallet.management.options.manage.accounts.page.js');

describe('Verify that the correct recovery phrase is copied', () => {
    it('should open the main Solflare page', async () => {
        // Step 1: Open the login page
        // The test begins by opening the login page of the Solflare application.
        logger.info('Opening the login page')
        await SolflarePage.open()

        // Step 2: Log the current page URL
        // This step is useful for tracking and debugging, ensuring the correct page is opened.
        const currentPageUrl = await browser.getUrl()
        logger.info(`Arrived at page: ${currentPageUrl}`)

        // Step 3: Check visibility of main page elements
        // The test checks if key elements on the login page are visible to the user.
        const isAccessWalletButtonVisible = await SolflarePage.accessWalletButton.isDisplayed()
        const isDownloadButtonVisible = await SolflarePage.downloadButton.isDisplayed()
        const isImageVisible = await SolflarePage.Image.isDisplayed()

        // Step 4: Log success messages to confirm elements are visible
        // After confirming visibility, these logs help trace the successful completion of checks.
        try {
            expect(isAccessWalletButtonVisible).toBe(true);
            logger.info('"Access wallet" button is visible');
        } catch (error) {
            logger.error('"Access wallet" button is NOT visible');
            throw error; // rethrow the error after logging
        }

        try {
            expect(isDownloadButtonVisible).toBe(true);
            logger.info('"Download for" button is visible');
        } catch (error) {
            logger.error('"Download for" button is NOT visible');
            throw error;
        }

        try {
            expect(isImageVisible).toBe(true);
            logger.info('"Image" is visible');
        } catch (error) {
            logger.error('"Image" is NOT visible');
            throw error;
        }
    });

    it('should click on "Access Wallet" button', async () => {
        // Step 1: Click on the "Access wallet" button to go to the onboarding section
        // This action is the trigger to navigate from the main page to the onboarding section, where users can access or create wallets.
        await SolflarePage.accessWalletButton.click()

        // Step 2: Wait for onboarding elements to be displayed
        // This step ensures that the page has loaded and specific onboarding elements are visible before further interactions.
        const isNewWalletButtonVisible = await SolflareOnboardPage.newWalletButton.waitForDisplayed({ timeout: 4000 })
        const isWalletButtonVisible = await SolflareOnboardPage.walletButton.waitForDisplayed({ timeout: 4000 })

        // Step 3: Assert that the onboarding elements are visible
        // Log before each assertion and handle possible errors
        try {
            expect(isNewWalletButtonVisible).toBe(true);
            logger.info('"New Wallet" button is visible'); // Log success if assertion passes
        } catch (error) {
            logger.error('"New Wallet" button is NOT visible'); // Log error if assertion fails
            throw error; // Re-throw to ensure test fails
        }

        try {
            expect(isWalletButtonVisible).toBe(true);
            logger.info('"Wallet" button is visible'); // Log success if assertion passes
        } catch (error) {
            logger.error('"Wallet" button is NOT visible'); // Log error if assertion fails
            throw error; // Re-throw to ensure test fails
        }

        // Log the end of assertions
        logger.info('Onboarding elements visibility check completed');
    });

    it('should click on "I need a new wallet" button', async () => {
        // Step 1: Click on the "New Wallet" button to navigate to the new wallet section
        // This step simulates a user action to create a new wallet. It is crucial for testing the functionality of navigating to the new wallet page.
        await SolflareOnboardPage.newWalletButton.click()

        // Step 2: Check visibility of the "Save Phrase" button
        // This step waits for the "Save Phrase" button to be displayed, indicating that the new wallet page has loaded successfully.
        const isSavePhraseButtonVisible = await SolflareCreatePage.savePhraseButton.waitForDisplayed({ timeout: 4000 });

        // Step 3: Assert that the "Save Phrase" button is visible
        // This assertion confirms that the "Save Phrase" button is visible on the new wallet page, ensuring proper UI functionality.
        try {
            // Step 1: Assert that the "Save Phrase" button is visible
            expect(isSavePhraseButtonVisible).toBe(true);

            // Log success if the assertion passes
            logger.info('"Save Phrase" button is visible');
        } catch (error) {
            // Log error with a detailed message if the assertion fails
            logger.error('"Save Phrase" button is NOT visible');

            // Re-throw the error to ensure the test fails
            throw error;
        }
    });

    it('should extract text from the new wallet page', async () => {
        // Step 1: Initialize an array to store the extracted text from all paragraphs
        // This array will hold the text from the paragraphs to be extracted for later processing.
        const extractedTexts = []; // Start with an empty array
        const totalParagraphs = 12; // Define the total number of paragraphs to extract text from

        // Step 2: Extract text from each paragraph with a specified data-index
        // Loop through all paragraphs to extract their text content.
        for (let i = 1; i <= totalParagraphs; i++) {
            // Construct the CSS selector to locate the paragraph by its data-index attribute
            const paragraphSelector = `p[data-index="${i}"]`;

            // Step 2.1: Locate the paragraph element using the constructed selector
            const paragraphElement = await $(paragraphSelector); // Fetch the element based on the selector

            // Step 2.2: If the paragraph element is not found, throw an error to signal failure
            // This condition ensures that all expected paragraphs are present on the page.
            if (!paragraphElement) {
                throw new Error(`Paragraph with data-index ${i} not found`); // Handle missing element
            }

            // Step 2.3: Extract the text content from the located paragraph
            const extractedText = await paragraphElement.getText(); // Get the text from the paragraph

            // Step 2.4: Store the extracted text in the initialized array
            extractedTexts.push(extractedText); // Add the text to the array for later use

            // Step 2.5: Log the extracted text for tracing or debugging
            logger.info(`Extracted text from paragraph ${i}: ${extractedText}`); // Useful for debugging
        }

        // Step 3: Join all extracted texts into a single space-separated string for further processing
        // This combines all extracted text into a single string for easier handling.
        const spaceSeparatedTexts = extractedTexts.join(' '); // Create a single string from all text

        // Step 4: Log the combined space-separated texts for verification
        // This log helps trace the combined text and ensures it can be used for subsequent steps.
        logger.info('Space-separated texts:', { spaceSeparatedTexts }); // Log the combined text string

        // Step 5: Split the combined text into individual words for use in input fields
        const inputValues = spaceSeparatedTexts.split(' '); // Convert the text string into an array of words

        // Step 6: Interact with the "Continue" button to proceed to the input fields page
        await SolflareCreatePage.phraseIsSaved.click(); // Click the button to move to the next step

        // Step 7: Define the total number of input fields on the new page
        const totalFields = 12; // Set the expected number of input fields

        // Step 8: Iterate through the total fields to input the corresponding text
        // Loop through all input fields to set the correct text.
        for (let i = 0; i < totalFields; i++) {
            // Step 8.1: Construct the selector for each input field based on its index
            const inputSelector = `#mnemonic-input-${i}`; // Construct the input field selector

            // Step 8.2: Locate the input field
            const inputField = await $(inputSelector); // Fetch the input field element

            // Step 8.3: If the field does not exist, throw an error to signal a problem
            if (!inputField) {
                throw new Error(`Input field with id mnemonic-input-${i} not found`); // Handle missing input field
            }

            // Step 8.4: Get the text to input into this field
            const textToInput = inputValues[i]; // Get the corresponding word to enter into the input field

            // Step 8.5: Set the value in the input field
            await inputField.setValue(textToInput); // Enter the text into the input field

            // Step 8.6: Log the action for traceability and debugging
            logger.info(`Entered '${textToInput}' into field ${i + 1}`); // Log the entered text
        }
    });

    it('should enter the password', async () => {
        // Step 1: Click the "Continue" button to proceed to the password setup page
        // This action initiates the process of setting a new password for the wallet.
        await SolflareCreatePage.continueButton.click(); // Click the continue button to advance in the setup process

        // Step 2: Define the new password
        const newPassword = config.PASSWORD; // Retrieve the password from the configuration file

        // Step 3: Set the new passwords using the Page Object method
        // This step sets both the password and its confirmation for account security.
        await SolflareCreatePage.setNewPasswords(newPassword, newPassword); // Set the password and confirm it

        // Step 4: Click the "Continue" button to trigger the action that leads to the final success page
        // This simulates the user progressing through the onboarding flow to the final stage.
        await SolflareCreatePage.continueButttonFinal.click(); // Click to proceed to the final success page
    });

    it('should open solana', async () => {
        // Step 1: Click the "Solana" button to navigate to the Solana portfolio section
        // This step simulates user interaction to open the Solana-related features in the application.
        await SolflareSuccessPage.solanaButton.click(); // Click the button to enter the Solana section

        // Step 2: Click the "Avatar" button to access wallet management
        // This action simulates a user interacting with their profile to view wallet management options.
        await SolflarePortfolioPage.avatarButton.click(); // Click the avatar to access wallet management settings

        // Step 3: Get the text of the "Main Wallet" element to verify wallet details
        // This step retrieves the label of the main wallet to ensure it's displayed correctly.
        const mainWallet = await SolflareWalletManagementPage.mainWalletText.getText(); // Get the text of the "Main Wallet"

        // Step 4: Assert that the text of the "Main Wallet" element matches the expected value
        logger.info('Asserting that the "Main Wallet" text matches the expected value');

        try {
            assert.strictEqual(mainWallet, 'Main Wallet', 'The text should be "Main Wallet"'); // Assertion
            logger.info('Assertion passed: The text is "Main Wallet"'); // Log success
        } catch (error) {
            logger.error('Assertion failed: The text is not "Main Wallet"'); // Log failure
            logger.error(`Error details: ${error.message}`); // Log error details
            throw error; // Ensure the test fails on error
        }

        // Log end of test
        logger.info('Test to open Solana section completed');

    });

    it('Verify adding new wallets', async () => {
        // Log the start of the test
        logger.info('Starting test: Verify adding new wallets');

        // Step 1: Click the "Plus" button to expand wallet management options
        logger.info('Clicking the "Plus" button to expand wallet management options');
        await SolflareWalletManagementPage.plusButton.click(); // Click the "Plus" button

        // Step 2: Click the "Recovery Phrase" button to enter the recovery phrase management section
        logger.info('Clicking the "Recovery Phrase" button to enter recovery phrase management');
        await SolflareWalletManagementOptionsPage.recoveryPhraseButton.click(); // Click the button to manage recovery phrases

        // Step 3: Create a list of all switch elements on the page
        logger.info('Creating a list of all switch elements on the page');
        const switches = await SolflareWalletManagementOptionsManageAccountsPage.switches; // Get all switches

        // Step 4: Check if there are any switches
        if (!switches || switches.length === 0) { // If no switches, throw an error
            logger.error("No switches found on the page");
            throw new Error("No switches found");
        }

        // Log the number of switches
        logger.info(`Total switches found: ${switches.length}`);

        // Step 5: Get the first switch and verify its state
        logger.info('Checking the first switch state');
        const firstSwitch = switches[0]; // Select the first switch
        const firstSwitchState = await firstSwitch.getAttribute('aria-checked'); // Get the state of the first switch

        try {
            assert.strictEqual(firstSwitchState, 'true', 'The first switch should be checked'); // Validate the state
            logger.info('The first switch is checked'); // Log success
        } catch (error) {
            logger.error('The first switch is NOT checked'); // Log failure
            throw error; // Ensure test fails
        }

        // Step 6: Assert that the first switch is disabled
        logger.info('Checking if the first switch is disabled');
        const isDisabled = await firstSwitch.isEnabled(); // Check if the first switch is enabled

        try {
            assert.strictEqual(isDisabled, false, 'The first switch should be disabled'); // Validate it is disabled
            logger.info('The first switch is disabled'); // Log success
        } catch (error) {
            logger.error('The first switch is NOT disabled'); // Log failure
            throw error; // Ensure test fails
        }

        // Step 7: Interact with the third switch to toggle its state
        logger.info('Toggling the third switch');
        const thirdSwitch = switches[2]; // Get the third switch
        await thirdSwitch.click(); // Click to toggle the third switch

        try {
            const thirdSwitchState = await thirdSwitch.getAttribute('aria-checked'); // Check if it's checked
            assert.strictEqual(thirdSwitchState, 'true', 'The third switch should be checked'); // Validate the state
            logger.info('The third switch is checked'); // Log success
        } catch (error) {
            logger.error('The third switch is NOT checked'); // Log failure
            throw error; // Ensure test fails
        }

        // Step 8: Interact with the fourth switch to toggle its state
        logger.info('Toggling the fourth switch');
        const fourthSwitch = switches[3]; // Get the fourth switch
        await fourthSwitch.click(); // Click to toggle the fourth switch

        try {
            const fourthSwitchState = await fourthSwitch.getAttribute('aria-checked'); // Check if it's checked
            assert.strictEqual(fourthSwitchState, 'true', 'The fourth switch should be checked'); // Validate the state
            logger.info('The fourth switch is checked'); // Log success
        } catch (error) {
            logger.error('The fourth switch is NOT checked'); // Log failure
            throw error; // Ensure test fails
        }

        // Step 9: Click the "Save" button to save changes
        logger.info('Clicking "Save" to apply changes');
        await SolflareWalletManagementOptionsManageAccountsPage.saveButton.click(); // Click the save button

        await browser.pause(1000); // Pause briefly to allow processing of the changes
        // Step 10: Get the count of wallet items to verify the number of managed wallets
        logger.info('Retrieving the number of wallet items');
        const walletItems = await SolflareWalletManagementOptionsManageAccountsPage.myWallets; // Get the wallet items

        try {
            assert.strictEqual(walletItems.length, 3, 'Expected 3 wallet items'); // Validate the expected count
            logger.info('Verified correct number of wallet items'); // Log success
        } catch (error) {
            logger.error('Wallet items count mismatch'); // Log failure
            throw error; // Ensure test fails
        }
        // Log the end of the test
        logger.info('Test for verifying adding new wallets completed');
    })
})