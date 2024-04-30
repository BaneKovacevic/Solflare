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
    get phraseIsSaved() {
        return $('.MuiButton-containedPrimary.css-1hcgjm')
    }
    get passwordInput() {
        return $('input[name="password"]');
    }

    get password2Input() {
        return $('input[name="password2"]');
    }
    get continueButton() {
        return $('[data-id="continue_button"]');
    }
    get continueButttonFinal() {
        return $('.MuiButton-containedPrimary.css-1hcgjm')
    }
    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async setNewPasswords(passwordInput, password2Input) {
        await this.passwordInput.setValue(passwordInput);
        await this.password2Input.setValue(password2Input);
    }
}

module.exports = new SolflareCreatePage();