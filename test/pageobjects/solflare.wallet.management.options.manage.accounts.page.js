const { $ } = require('@wdio/globals')
const Page = require('./page')

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SolflareWalletManagementOptionsManageAccountsPage extends Page {
    /**
     * define selectors using getter methods
     */
    get switches() {
        return $$("button.switch_switchRoot__cjolrp1")
    }
    get saveButton() {
        return $("//button[span[contains(text(), 'Save')]]")
    }
    get myWallets() {
        return $$('div.generalList_generalList__1fjhg823 > div.listItem_listItemRecipe__p5ys2x3')
    }

}
module.exports = new SolflareWalletManagementOptionsManageAccountsPage();