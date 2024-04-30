const { $ } = require('@wdio/globals')
const Page = require('./page')

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SolflarePortfolioPage extends Page {
    /**
     * define selectors using getter methods
     */
    get videoElement() {
        return $('.pageTemplate_videoBackground__1m49bsm9')
    }
}
module.exports = new SolflarePortfolioPage();