const { $ } = require('@wdio/globals')
const Page = require('./page')

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SolflarePage extends Page {
    /**
     * define selectors using getter methods
     */
    get accessWalletButton () {
        return $('a[href="/access"]')
    }
    get downloadButton() {
        return $('a.btn.btn--dark.btn--with-icon.js-extension-url.d-none.d-lg-flex')
    }
    get Image() {
        return $('img[src="/assets/A-secure-and-powerful-Solana-Walletx2.c6efaf0a..png"]')
    }

}

module.exports = new SolflarePage();
