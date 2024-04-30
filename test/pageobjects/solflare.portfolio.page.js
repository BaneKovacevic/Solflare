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
    get avatarButton() {
        return $('.avatar_avatarRecipe__1c2k9pt1.avatar_avatarRecipe_shape_circle__1c2k9pt8')
    }

}
module.exports = new SolflarePortfolioPage();