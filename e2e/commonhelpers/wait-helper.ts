import {PageHelper} from './page-helper';
import {browser} from 'protractor';

export class WaitHelper {
    static async sleep(sleepTime = PageHelper.timeout.xxs) {
        await browser.sleep(sleepTime);
    }
}
