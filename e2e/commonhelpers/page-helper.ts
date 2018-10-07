/**
 * Page helper for general utility
 */
import { browser, ElementFinder } from 'protractor';

export class PageHelper {
    /**
     * Timeout collection
     * @type {{xs: number; s: number; m: number; l: number; xl: number; xxl: number; xxxl: number}}
     */
    static timeout = {
        xxs: 1000,
        xs: 2000,
        s: 5000,
        m: 10000,
        l: 25000,
        xl: 50000,
        xxl: 75000,
    };
    static DEFAULT_TIMEOUT = PageHelper.timeout.xxl;

    public static async getPageTitle() {
        return await browser.getTitle();
    }

    /**
     * Refresh a page
     *
     */
    public static async refreshPage() {
        await browser.refresh();
    }

    public static async goToUrl(url: string, waitForAngular = false) {
        await browser.waitForAngularEnabled(waitForAngular);
        return await browser.get(url, PageHelper.DEFAULT_TIMEOUT);
    }

    static async getTitle() {
        return await browser.driver.getTitle();
    }


    /**
   * This JavaScript function always returns a random number between min and max (both included):
   * @param min
   * @param max
   * @returns {any}
   */
    static getRandomInteger(min = 1, max = 9999): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static async checkScrollBarPresence(element: ElementFinder) {
        const status = browser.executeScript(`var element = '${element}';
        return element.scrollHeight != element.innerheight;`);
        if (status) {
            return true;
        }
        return false;
    }

    /**
  * To maximize the browser window
  */
    static async maxmizeWindow() {
        browser.manage().window().maximize();
    }

}