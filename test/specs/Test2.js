// Grouped import statements for external libraries
const { expect } = require('@wdio/globals');
const { Key } = require('webdriverio');
const assert = require('assert');

// Grouped import statements for page objects
const SolflarePage = require('../pageobjects/solflare.page.js');
const SolflareCreatePage = require('../pageobjects/solflare.create.page.js');
const SolflareOnboardPage = require('../pageobjects/solflare.onboard.page.js');
const SolflareSuccessPage = require('../pageobjects/solflare.success.page.js');
const SolflarePortfolioPage = require('../pageobjects/solflare.portfolio.page.js');
const TwitterSolflare = require('../pageobjects/twitter.solflare.wallet.js')

// Grouped import statements for configurations and utilities
const logger = require('C:/Repository/WebdriverIO/Solflare/Logger/logger');
const config = require('../config/config.js');


describe('Verify that the Solflare’s Twitter profile opens in a new tab and after close user is returned to the solflare app', () => {
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

        // Step 4: Assert visibility of key elements
        // This step confirms that essential elements are visible on the page, ensuring proper UI functionality.
        expect(isAccessWalletButtonVisible).toBe(true, '"Access wallet" button should be visible, but it is not.')
        expect(isDownloadButtonVisible).toBe(true, '"Download for" button should be visible, but it is not.')
        expect(isImageVisible).toBe(true, '"Image" should be visible, but it is not.')

        // Step 5: Log success messages to confirm elements are visible
        // After confirming visibility, these logs help trace the successful completion of checks.
        logger.info('The "Access wallet" button is visible.')
        logger.info('The "Download for" button is visible.')
        logger.info('The "Image" is visible.')
    });

    it('should click on "Access Wallet" button', async () => {
        // Step 1: Click on the "Access wallet" button to navigate to the onboarding section
        // This step initiates the onboarding process by interacting with the main page to move forward.
        await SolflarePage.accessWalletButton.click(); // Click the button to access the onboarding process

        // Step 2: Wait for key onboarding elements to be displayed
        // These waits ensure that the necessary elements are present before proceeding with assertions.
        const isNewWalletButtonVisible = await SolflareOnboardPage.newWalletButton.waitForDisplayed({ timeout: 4000 }); // Wait for the "New Wallet" button to appear
        const isWalletButtonVisible = await SolflareOnboardPage.walletButton.waitForDisplayed({ timeout: 4000 }); // Wait for the "Wallet" button to appear

        // Step 3: Assert that the onboarding elements are visible
        // These assertions confirm that the expected elements are displayed, indicating the page loaded correctly.
        expect(isNewWalletButtonVisible).toBe(true, '"New Wallet" button should be visible, but it is not.'); // Check the visibility of the "New Wallet" button
        expect(isWalletButtonVisible).toBe(true, '"Wallet" button should be visible, but it is not.'); // Check the visibility of the "Wallet" button

        // Step 4: Log success messages to confirm the onboarding elements are visible
        // This step logs successful checks, providing confirmation for debugging and traceability.
        logger.info('The "New Wallet" button is visible.'); // Log success for the "New Wallet" button
        logger.info('The "Wallet" button is visible.'); // Log success for the "Wallet" button
    });

    it('should click on "I need a new wallet" button', async () => {
        // Step 1: Click on the "New Wallet" button to navigate to the new wallet section
        // This step initiates the process to create a new wallet by clicking the corresponding button in the onboarding section.
        await SolflareOnboardPage.newWalletButton.click(); // Simulate the button click to proceed to the new wallet creation page

        // Step 2: Check the visibility of the "Save Phrase" button
        // This step ensures that the "Save Phrase" button, a critical element on the new wallet page, is visible within a given timeout.
        const isSavePhraseButtonVisible = await SolflareCreatePage.savePhraseButton.waitForDisplayed({ timeout: 4000 }); // Wait for the "Save Phrase" button to be displayed

        // Step 3: Assert that the "Save Phrase" button is visible
        // This assertion validates that the page has loaded correctly, confirming the presence of a key element for saving the recovery phrase.
        expect(isSavePhraseButtonVisible).toBe(true, '"Save Phrase" button should be visible.'); // Verify that the button is displayed

        // Step 4: Log a success message to confirm the visibility of the "Save Phrase" button
        // Logging is crucial for traceability and helps verify that the expected elements are visible.
        logger.info('The "Save Phrase" button is visible.'); // Log the successful detection of the "Save Phrase" button
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
        logger.info('Space-separated texts:', spaceSeparatedTexts); // Log the combined text string

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
    });

    it('should open Solflare Twitter in a new tab when clicking Follow us', async () => {
        // Step 1: Click the "Continue" button to proceed to the final success page
        // This step represents user interaction to complete a specific process (e.g., onboarding).
        await SolflareCreatePage.continueButttonFinal.click(); // Trigger transition to the success page

        // Step 2: Click the "Follow us" button to open Solflare Twitter in a new browser tab
        // This action simulates a user clicking a button that leads to an external link.
        await SolflareSuccessPage.followButton.click(); // Opens Solflare's Twitter page in a new tab

        // Step 3: Get the list of all open window handles (tabs)
        // This step is used to check if a new tab has been opened successfully.
        const allHandlesBefore = await browser.getWindowHandles(); // Retrieve the list of open browser tabs

        // Step 4: Assert that a new tab was opened
        // This assertion ensures that clicking the "Follow us" button led to opening a new tab.
        assert.strictEqual(allHandlesBefore.length, 2, 'A new tab should have been opened'); // Expecting two tabs

        // Step 5: Switch to the newly opened tab
        // After confirming a new tab, switch to it to perform additional actions or checks.
        const newTabHandle = allHandlesBefore[allHandlesBefore.length - 1]; // Get the last tab (the new one)
        await browser.switchToWindow(newTabHandle); // Switch to the newly opened tab

        // Step 6: Check if the expected element is visible in the new tab
        // This verifies that the expected content (e.g., a Twitter profile) is displayed in the new tab.
        const isAccountNameVisible = await TwitterSolflare.accountName.waitForDisplayed({ timeout: 4000 });
        expect(isAccountNameVisible).toBe(true, '"Access wallet" button should be visible, but it is not.');

        // Step 7: Check if the new tab is the correct Solflare Twitter page
        // This step validates the URL to ensure the correct page was opened.
        const currentUrl = await browser.getUrl(); // Retrieve the URL of the current tab
        const expectedUrl = 'https://twitter.com/solflare_wallet'; // Expected URL for Solflare's Twitter
        assert.strictEqual(currentUrl, expectedUrl, 'The new tab should navigate to Solflare Twitter'); // Validate URL
        logger.info(`New tab URL: ${currentUrl}`); // Log the URL of the newly opened tab

        // Step 8: Close the new tab after verification
        // This helps clean up the browser state after completing the test.
        await browser.closeWindow(); // Close the current tab

        // Step 9: Confirm that the new tab has been closed
        // This step ensures that the cleanup operation (closing the new tab) was successful.
        const allHandlesAfter = await browser.getWindowHandles(); // Get the list of remaining open tabs
        assert.strictEqual(allHandlesAfter.length, 1, 'The new tab should be closed after verification'); // Check if the tab is closed
        logger.info('Confirmed new tab is closed.'); // Log the successful closure of the new tab

        // Step 10: Switch back to the original tab
        // Returning to the original tab to continue with subsequent test steps.
        await browser.switchToWindow(allHandlesAfter[0]); // Switch back to the original tab

        // Step 11: Wait for onboarding elements to be displayed
        // This checks if the expected elements are visible after switching back.
        const isVideoVisible = await SolflarePortfolioPage.videoElement.waitForDisplayed({ timeout: 4000 }); // Wait for the video element

        try {
            // Step 12: Assert that the onboarding element (video) is visible
            expect(isVideoVisible).toBe(true, 'The video element should be visible after returning to the original tab'); // Validate visibility
            logger.info('Verified video element is visible in the original tab.'); // Log if successful
        } catch (error) {
            // If the assertion fails, log the error and provide additional context
            logger.error('Assertion failed: The video element is not visible after returning to the original tab.');
            logger.error(`Error details: ${error.message}`);
            throw error; // Re-throw the error to ensure the test fails
        }
    });
})