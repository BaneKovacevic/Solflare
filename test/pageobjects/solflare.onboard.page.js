const { $ } = require('@wdio/globals')
const Page = require('./page')

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SolflareOnboardPage extends Page {
    /**
     * define selectors using getter methods
     */
    get newWalletButton() {
        return $('button[data-id="i_need_a_wallet_button"]')
    }
    get walletButton() {
        return $('button[data-id="i_already_have_wallet_button"]')
    }
}

module.exports = new SolflareOnboardPage();