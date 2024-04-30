const { $ } = require('@wdio/globals')
const Page = require('./page')

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SolflareWalletManagementOptionsPage extends Page {
    /**
     * define selectors using getter methods
     */
    get recoveryPhraseButton() {
        return $("//span[text()='Manage recovery phrase']")
    }
}
module.exports = new SolflareWalletManagementOptionsPage();