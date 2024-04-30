const { $ } = require('@wdio/globals')
const Page = require('./page')

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SolflareCreatePage extends Page {
    /**
     * define selectors using getter methods
     */
    get savePhraseButton() {
        return $('.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.css-1hcgjm')
    }
    get walletButton() {
        return $('button[data-id="i_already_have_wallet_button"]')
    }
    get copyButton() {
        return $('(//button[contains(@class, "MuiButton-textPrimary")])[2]')
    }
}

module.exports = new SolflareCreatePage();