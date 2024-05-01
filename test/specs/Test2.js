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

// Grouped import statements for configurations and utilities
const logger = require('C:/Repository/WebdriverIO/Solflare/Logger/logger');
const config = require('../config/config.js');


describe('Verify that the Solflare’s Twitter profile opens in a new tab and after close user is returned to the solflare app', () => {
    it('should open the main Solflare page', async () => {
        // Step 1: Open the login page to start the test
        // This step initiates the test by navigating to the login page where we will verify key elements.
        logger.info('Opening the login page'); // Log the action for debugging and traceability
        await SolflarePage.open(); // Open the page using the page object model

        // Step 2: Verify that the navigation to the login page is successful
        // This step confirms that the test is at the right page by checking the current URL.
        const currentPageUrl = await browser.getUrl(); // Get the URL of the current page
        logger.info(`Arrived at page: ${currentPageUrl}`); // Log the URL to ensure the correct page was opened

        // Step 3: Check the visibility of key elements on the login page
        // These checks ensure that critical elements are present, indicating the page loaded correctly.
        const isAccessWalletButtonVisible = await SolflarePage.accessWalletButton.isDisplayed(); // Is the "Access wallet" button visible?
        const isDownloadButtonVisible = await SolflarePage.downloadButton.isDisplayed(); // Is the "Download for" button visible?
        const isImageVisible = await SolflarePage.image.isDisplayed(); // Is the expected image visible?

        // Step 4: Assert that key elements are visible to validate page structure
        // These assertions ensure that important elements are displayed, which is critical for the page's functionality.
        expect(isAccessWalletButtonVisible).toBe(true, '"Access wallet" button should be visible, but it is not.'); // Confirm the "Access wallet" button is visible
        expect(isDownloadButtonVisible).toBe(true, '"Download for" button should be visible, but it is not.'); // Confirm the "Download for" button is visible
        expect(isImageVisible).toBe(true, '"Image" should be visible, but it is not.'); // Confirm the expected image is visible

        // Step 5: Log success messages to indicate that the main page elements are visible
        // This step confirms the successful completion of the visibility checks.
        logger.info('The "Access wallet" button is visible.'); // Log the visibility of the "Access wallet" button
        logger.info('The "Download for" button is visible.'); // Log the visibility of the "Download for" button
        logger.info('The "Image" is visible.'); // Log the visibility of the expected image
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
        // Step 1: Click the "Continue" button to trigger the action that leads to the final success page
        // This simulates the user progressing through the onboarding flow to the final stage.
        await SolflareCreatePage.continueButttonFinal.click(); // Click to proceed to the final success page

        // Step 2: Click the "Follow us" button to open the Solflare Twitter page in a new tab
        // This action initiates opening a new browser tab, typically leading to external content.
        await SolflareSuccessPage.followButton.click(); // Click to open the Solflare Twitter page in a new tab

        // Step 3: Get all open window handles (tabs) to verify if a new tab was opened
        const allHandlesBefore = await browser.getWindowHandles(); // Retrieve the list of currently open tabs

        // Step 4: Assert that a new tab was indeed opened
        // This assertion ensures that clicking the "Follow us" button triggers opening a new browser tab.
        assert.strictEqual(allHandlesBefore.length, 2, 'A new tab should have been opened'); // Expect two tabs

        // Step 5: Switch to the new tab, assuming it's the last one in the list
        // Switching to the newly opened tab allows further actions or verification.
        const newTabHandle = allHandlesBefore[allHandlesBefore.length - 1]; // Get the last tab handle
        await browser.switchToWindow(newTabHandle); // Switch to the new tab

        // Step 6: Check if the new tab is the expected Solflare Twitter page
        // This step verifies that the new tab has navigated to the correct external URL.
        const currentUrl = await browser.getUrl(); // Get the URL of the current tab
        const expectedUrl = 'https://twitter.com/solflare_wallet'; // Expected Twitter page
        assert.strictEqual(currentUrl, expectedUrl, 'The new tab should navigate to Solflare Twitter'); // Validate URL

        // Step 7: Close the new tab after verification to clean up
        await browser.closeWindow(); // Close the current tab

        // Step 8: Confirm that the new tab has been closed
        // This step checks that closing the tab was successful.
        const allHandlesAfter = await browser.getWindowHandles(); // Get remaining tabs after closing
        assert.strictEqual(allHandlesAfter.length, 1, 'The new tab should be closed after verification'); // Verify tab is closed

        // Step 9: Switch back to the original tab
        await browser.switchToWindow(allHandlesAfter[0]); // Return to the original tab to continue the test

        // Step 10: Wait for onboarding elements to be displayed
        // This step ensures that the transition back to the original tab is successful and expected elements are present.
        const isVideoVisible = await SolflarePortfolioPage.videoElement.waitForDisplayed({ timeout: 4000 }); // Wait for the video element to be visible

        // Step 11: Assert that the onboarding element (video) is visible
        expect(isVideoVisible).toBe(true, 'The video element should be visible after returning to the original tab'); // Validate visibility
    });
})