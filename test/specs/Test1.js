const { expect } = require('@wdio/globals')
const SolflarePage = require('C:/Repository/WebdriverIO/Solflare/test/pageobjects/solflare.page.js')
const SolflareCreatePage = require('C:/Repository/WebdriverIO/Solflare/test/pageobjects/solflare.create.page')
const SolflareOnboardPage = require('../pageobjects/solflare.onboard.page')
const logger = require('C:/Repository/WebdriverIO/Solflare/Logger/logger.js')
const { Key } = require('webdriverio')
const assert = require('assert');


describe('My Login application', () => {
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
    })

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

    it('should extract text from newwallet page and compare it with what we copied in clipbord', async () => {

        await SolflareCreatePage.copyButton.click()

        // Initialize an array to store the extracted text from all paragraphs
        const extractedTexts = []
        const totalParagraphs = 12 // Define the total number of paragraphs to extract text from

        // Extract text from each paragraph with the specified data-index
        for (let i = 1; i <= totalParagraphs; i++) {
            // Construct the CSS selector to locate the paragraph
            const paragraphSelector = `p[data-index="${i}"]`

            // Locate the paragraph element
            const paragraphElement = await $(paragraphSelector)

            // Verify the element was found to prevent errors
            if (!paragraphElement) {
                throw new Error(`Paragraph with data-index ${i} not found`)
            }

            // Extract the text content from the located paragraph
            const extractedText = await paragraphElement.getText()

            // Store the extracted text in the array
            extractedTexts.push(extractedText)

            // Log the extracted text for tracing or debugging
            console.log(`Extracted text from paragraph ${i}: ${extractedText}`)
        }

        // Join all extracted texts into a single space-separated string
        const spaceSeparatedTexts = extractedTexts.join(' ')

        // Log the combined result for verification
        console.log('Space-separated texts:', spaceSeparatedTexts)

        // Navigate to the search engine's website (Bing)
        SolflarePage.openBing();

        // Locate the search input field and check if it exists
        const searchInput = await $('#sb_form_q')
        if (!searchInput) {
            throw new Error('Search box not found')
        }

        // Click on the search box to ensure focus
        await searchInput.click()

        // Simulate Ctrl+V (paste) to insert the extracted text
        await browser.keys([Key.Ctrl, 'v'])

        // Retrieve the current value from the search box
        const inputValue = await searchInput.getValue()

        // Log the current input value for validation
        console.log('Input value:', inputValue)

        // Assert that the search box input matches the expected text
        assert.strictEqual(inputValue, spaceSeparatedTexts)

        // Log success messages to confirm elements are visible
        logger.info('Correct recovery phrase is copied')
    });
})

