const { $ } = require('@wdio/globals')
const Page = require('./page')

/**
 * sub page containing specific selectors and methods for a specific page
 */
class TwitterSolflareWalletPage extends Page {
    /**
     * define selectors using getter methods
     */
    get accountName() {
        return $("//span[contains(text(), 'Solflare - The Solana Wallet')]")
    }
}
module.exports = new TwitterSolflareWalletPage();