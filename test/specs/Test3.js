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
        // This assertion confirms that the main wallet is labeled correctly, indicating the portfolio is set up as expected.
        assert.strictEqual(mainWallet, 'Main Wallet', 'The text should be "Main Wallet"'); // Validate that the text matches the expected label
    });

    it('Verify adding new wallets', async () => {
        // Step 1: Click the "Plus" button to expand wallet management options
        // This step initiates interaction with the wallet management section to access more features.
        await SolflareWalletManagementPage.plusButton.click(); // Click to expand wallet management options

        // Step 2: Click the "Recovery Phrase" button to enter the recovery phrase management section
        // This step leads to a section where switches can be toggled for various actions.
        await SolflareWalletManagementOptionsPage.recoveryPhraseButton.click(); // Click to access recovery phrase options

        // Step 3: Create a list of all switch elements on the page
        // This step gathers all switches in the current context for further interaction and verification.
        const switches = SolflareWalletManagementOptionsManageAccountsPage.switches; // List of all switches

        // Step 4: Ensure there are elements in the list to avoid empty interactions
        // This validation prevents errors due to missing or undefined switches.
        if (switches.length === 0) { // Check if there are any switches in the list
            throw new Error("No switches found"); // Throw an error if no switches are found
        }

        // Step 5: Get the first switch and verify its state
        // This step checks if the first switch is toggled (checked) and whether it is enabled or disabled.
        const firstSwitch = switches[0]; // Select the first switch in the list
        const firstSwitchState = await firstSwitch.getAttribute('aria-checked'); // Check if the switch is checked
        assert.strictEqual(firstSwitchState, 'true', 'The first switch should be checked'); // Assert the expected state

        // Step 6: Assert that the first switch is disabled
        // This assertion confirms that the switch is correctly disabled to prevent unintended toggling.
        const isDisabled = await firstSwitch.isEnabled(); // Check if the first switch is enabled
        assert.strictEqual(isDisabled, false, 'The first switch should be disabled'); // Assert that it is disabled

        // Step 7: Interact with the third switch to toggle its state
        // This step simulates a user toggling another switch for further validation.
        const thirdSwitch = switches[2]; // Select the third switch in the list
        await thirdSwitch.click(); // Click to toggle the third switch

        // Step 7.1: Assert that the third switch is checked after interaction
        // This assertion verifies that the click operation toggles the switch as expected.
        const thirdSwitchState = await thirdSwitch.getAttribute('aria-checked'); // Check if the switch is checked
        assert.strictEqual(thirdSwitchState, 'true', 'The third switch should be checked'); // Validate the expected state

        // Step 8: Interact with the fourth switch to toggle its state
        // This step simulates another user interaction for additional testing.
        const fourthSwitch = switches[3]; // Select the fourth switch
        await fourthSwitch.click(); // Click to toggle the fourth switch

        // Step 8.1: Assert that the fourth switch is checked after interaction
        // This assertion confirms that the switch was correctly toggled.
        const fourthSwitchState = await fourthSwitch.getAttribute('aria-checked'); // Check if the switch is checked
        assert.strictEqual(fourthSwitchState, 'true', 'The fourth switch should be checked'); // Validate the expected state

        // Step 9: Click the "Save" button to save the changes made to the switches
        // This step simulates a user saving the changes made to the wallet management settings.
        await SolflareWalletManagementOptionsManageAccountsPage.saveButton.click(); // Click to save the changes
        await browser.pause(1000); // Pause briefly to allow processing of the changes

        // Step 10: Get the count of wallet items to verify the number of managed wallets
        // This step checks the updated count of wallet items after saving changes.
        const walletItems = await SolflareWalletManagementOptionsManageAccountsPage.myWallets.length; // Get the total count of wallets
        console.log(`Number of items in the list: ${walletItems}`); // Log the total count of wallet items

        // Step 11: Assert that the number of wallet items matches the expected count
        // This assertion confirms that the correct number of wallets is displayed, indicating successful management.
        const expectedItemCount = 3; // Define the expected number of wallet items
        assert.strictEqual(walletItems, expectedItemCount, `Expected ${expectedItemCount} items in the list`); // Validate the expected count of wallets
    });
})