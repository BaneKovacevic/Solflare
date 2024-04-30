const { $ } = require('@wdio/globals')
const Page = require('./page')

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SolflareSuccessPage extends Page {
    /**
     * define selectors using getter methods
     */
    get followButton() {
        return $("//button[.//span[contains(text(), 'Follow us')]]")
    }
    get solanaButton() {
        return $('button[color="primary"]')
    }
}
module.exports = new SolflareSuccessPage();