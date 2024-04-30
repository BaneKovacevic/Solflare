const { expect } = require('@wdio/globals')
const SolflarePage = require('C:/Repository/WebdriverIO/Solflare/test/pageobjects/solflare.page.js')
const SolflareCreatePage = require('C:/Repository/WebdriverIO/Solflare/test/pageobjects/solflare.create.page')
const SolflareOnboardPage = require('../pageobjects/solflare.onboard.page')
const logger = require('C:/Repository/WebdriverIO/Solflare/Logger/logger.js')
const { Key } = require('webdriverio')
const assert = require('assert');


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
        // Step 1: Click on the "Access wallet" button to go to the onboarding section
        // This action is the trigger to navigate from the main page to the onboarding section, where users can access or create wallets.
        await SolflarePage.accessWalletButton.click()

        // Step 2: Wait for onboarding elements to be displayed
        // This step ensures that the page has loaded and specific onboarding elements are visible before further interactions.
        const isNewWalletButtonVisible = await SolflareOnboardPage.newWalletButton.waitForDisplayed({ timeout: 4000 })
        const isWalletButtonVisible = await SolflareOnboardPage.walletButton.waitForDisplayed({ timeout: 4000 })

        // Step 3: Assert that the onboarding elements are visible
        // These assertions confirm that the critical elements on the onboarding page have loaded and are visible to the user.
        expect(isNewWalletButtonVisible).toBe(true, '"New Wallet" button should be visible, but it is not.')
        expect(isWalletButtonVisible).toBe(true, '"Wallet" button should be visible, but it is not.')

        // Step 4: Log success messages to confirm elements are visible
        // If the previous assertions are successful, these logs help verify that the expected elements are visible and the onboarding page is functioning correctly.
        logger.info('The "New Wallet" button is visible.')
        logger.info('The "Wallet" button is visible.')
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
        expect(isSavePhraseButtonVisible).toBe(true, '"Save Phrase" button should be visible.')

        // Step 4: Log success message to confirm visibility
        // If the assertion is successful, this log message helps trace that the expected element is visible, indicating that the new wallet page is functioning as expected.
        logger.info('The "Save Phrase" button is visible.')
    });

    it('should extract text from newwallet page and compare it with what we copied in clipboard', async () => {
        // Step 1: Click the "Copy" button to copy the recovery phrase to the clipboard
        // This simulates a user copying a recovery phrase, initiating the process for further validation.
        await SolflareCreatePage.copyButton.click()

        // Step 2: Initialize an array to store the extracted text from all paragraphs
        // This array will hold the text from multiple paragraphs, allowing us to compare with the clipboard content later.
        const extractedTexts = []
        const totalParagraphs = 12 // Define the total number of paragraphs from which text will be extracted

        // Step 3: Extract text from each paragraph with a specific data-index attribute
        // This loop iterates over all defined paragraphs and extracts their text content.
        for (let i = 1; i <= totalParagraphs; i++) {
            // Construct a CSS selector to locate each paragraph based on its data-index
            const paragraphSelector = `p[data-index="${i}"]`

            // Locate the paragraph element using the constructed selector
            const paragraphElement = await $(paragraphSelector)

            // Step 3.1: Verify the paragraph element was found
            // If the element is not found, throw an error to indicate a possible problem with the page structure.
            if (!paragraphElement) {
                throw new Error(`Paragraph with data-index ${i} not found`)
            }

            // Step 3.2: Extract the text content from the located paragraph
            const extractedText = await paragraphElement.getText()

            // Step 3.3: Store the extracted text in the initialized array
            extractedTexts.push(extractedText) // Collect the extracted text for later comparison

            // Step 3.4: Log the extracted text for tracing or debugging
            console.log(`Extracted text from paragraph ${i}: ${extractedText}`) // Useful for debugging and analysis
        }

        // Step 4: Join all extracted texts into a single space-separated string
        // This combines all the extracted text into a single string for easier comparison with clipboard content.
        const spaceSeparatedTexts = extractedTexts.join(' ')

        // Step 5: Log the combined result for verification
        // This log helps to trace the combined text and ensure it matches expected content.
        console.log('Space-separated texts:', spaceSeparatedTexts)

        // Step 6: Navigate to a search engine's website (Bing) to validate clipboard content
        // This step checks if the copied text is correctly pasted by using a known search engine to test the clipboard.
        SolflarePage.openBing()

        // Step 7: Locate the search input field and check if it exists
        // This ensures the page has loaded and the search input is available for interaction.
        const searchInput = await $('#sb_form_q')
        if (!searchInput) {
            throw new Error('Search box not found') // Error handling in case the search box is missing
        }

        // Step 8: Click on the search box to ensure focus before pasting
        // This ensures that the correct element is targeted when pasting the copied text.
        await searchInput.click()

        // Step 9: Simulate Ctrl+V (paste) to insert the extracted text
        // This step pastes the clipboard content into the search box to compare with the extracted text.
        await browser.keys([Key.Ctrl, 'v']) // Simulate pasting action

        // Step 10: Retrieve the current value from the search box
        // This is used to check if the clipboard content has been pasted correctly.
        const inputValue = await searchInput.getValue() // Get the pasted content

        // Step 11: Log the current input value for validation
        // This log helps verify that the pasted content matches the expected text.
        console.log('Input value:', inputValue)

        // Step 12: Assert that the search box input matches the expected text
        // This assertion confirms that the clipboard content matches the extracted text from the new wallet page.
        assert.strictEqual(inputValue, spaceSeparatedTexts) // Validate that the copied text is accurate

        // Step 13: Log success messages to confirm the recovery phrase is correctly copied
        logger.info('Correct recovery phrase is copied') // Indicates the test passed successfully
    })
})

