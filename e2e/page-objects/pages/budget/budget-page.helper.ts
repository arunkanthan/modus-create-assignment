import { browser } from 'protractor';
import { BudgetPageConstants } from './budget-page.constants';
import { BudgetPage } from './budget-page.po';
import { PageHelper } from '../../../commonhelpers/page-helper';
import { StepLogger } from '../../../logger/step-logger';
import { WaitHelper } from '../../../commonhelpers/wait-helper';

export class BudgetPageHelper {

    static async verifyBudgetPageIsDisplayed() {
        let title = await browser.getTitle();
        await expect(title).toContain(BudgetPageConstants.pageTitle);
    }

    static async clickOnCategoryDropDown() {
        await BudgetPage.categoryDropDownButton.click();
    }

    static async selectCategory() {
        const rnum = await PageHelper.getRandomInteger(1, 10);
        await BudgetPage.categoryDropDownItem(rnum).click();
    }

    static async enterDescription() {
        const description = BudgetPageConstants.descriptionText + PageHelper.getRandomInteger(1, 10);
        await BudgetPage.description.sendKeys(description);
    }

    static async enterValue() {
        const value = await PageHelper.getRandomInteger(1, 1000);
        await BudgetPage.value.sendKeys(value);
    }

    static async clickOnAdd() {
        await BudgetPage.addButton.click();
    }

    static async addNewBudgetEntry(stepLogger: StepLogger) {
        stepLogger.step('Select Category');
        await this.selectCategory();
        stepLogger.step('Enter Description');
        await this.enterDescription();
        stepLogger.step('Enter Value');
        await this.enterValue();
        stepLogger.step('Click on Add');
        await this.clickOnAdd();
    }

    static async budgetListUpdated(beforeCount: number) {
        const afterCount = await BudgetPage.budgetListItemsCount;
        await expect(afterCount).toEqual(beforeCount + 1);
    }

    static async addButtonDisabled() {
        await WaitHelper.sleep(PageHelper.timeout.s);
        let status = await browser.isElementPresent(BudgetPage.addButtonDisabled);
        await expect(status).toBeTruthy();
    }

    static async addButtonEnabled() {
        await WaitHelper.sleep(PageHelper.timeout.s);
        let status = await browser.isElementPresent(BudgetPage.addButtonDisabled);
        await expect(status).toBeFalsy();
    }

    static async clearDescription() {
        await BudgetPage.description.clear();
    }

    static async addNewBudgetEntries(stepLogger: StepLogger, numofentries: number) {
        let num = 0;
        while(num < numofentries) {
            await this.addNewBudgetEntry(stepLogger);
            num++;
        }
    }

    static async verifyVerticalScrollBarIsDisplayed() {
        const status = await PageHelper.checkScrollBarPresence(BudgetPage.budgetListTable());
        await expect(status).toBeTruthy();
    }
}

