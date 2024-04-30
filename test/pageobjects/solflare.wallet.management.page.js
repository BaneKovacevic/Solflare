const { $ } = require('@wdio/globals')
const Page = require('./page')

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SolflareWalletManagementPage extends Page {
    /**
     * define selectors using getter methods
     */
    get mainWalletText() {
        return $("//span[contains(@class, 'ellipsisOverflow_ellipsisOverflow__nk3dp60') and text()='Main Wallet']")
    }
    get plusButton() {
        return $('.svg-inline--fa.fa-plus.icon_iconRecipe_size_l__102a6quc')
    }
}
module.exports = new SolflareWalletManagementPage();