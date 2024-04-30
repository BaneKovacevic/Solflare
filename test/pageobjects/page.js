const { browser } = require('@wdio/globals')

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
module.exports = class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    // Method to maximize the browser window
    maximizeWindow() {
        return browser.maximizeWindow();
    }
    open(path) {
        this.maximizeWindow()
        return browser.url(`https://solflare.com`)
    }
    openBing() {
        this.maximizeWindow();
        return browser.url('https://www.bing.com/'); // Open Bing's homepage
    }
}
