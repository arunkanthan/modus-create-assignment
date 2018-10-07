import { StepLogger } from '../logger/step-logger';
import { BudgetPageHelper } from '../page-objects/pages/budget/budget-page.helper';
import { PageHelper } from '../commonhelpers/page-helper';
import { BudgetPage } from '../page-objects/pages/budget/budget-page.po';
import { WaitHelper } from '../commonhelpers/wait-helper';

describe('Budget page e2e testsuite - ', () => {
  let stepLogger: StepLogger;

  beforeEach(() => {
    stepLogger = new StepLogger();
    PageHelper.maxmizeWindow();
    PageHelper.goToUrl('/' , false);
  });

  it('User is able to add to the budget list and list is updated - TC1001', async () => {
    stepLogger.caseId = 1001;

    stepLogger.step(' Precondition - Navigate to budgting app page');
    // covered in before each 
    stepLogger.step(' Step 1 - Navigate to budget page');
    stepLogger.step('Verification - Verify budget page is displayed');
    await BudgetPageHelper.verifyBudgetPageIsDisplayed();

    stepLogger.step(' Step 2 - add new budget entry');
    const budgetListCountBefore = await BudgetPage.budgetListItemsCount;
    await BudgetPageHelper.addNewBudgetEntry(stepLogger);
    stepLogger.step('Verification - Verify budget list is updated');
    await BudgetPageHelper.budgetListUpdated(budgetListCountBefore);
  });

  // This test case will fail as it expects description field also to be non-empty
  it('Add button is disabled if any input field is empty - TC1004', async () => {
    stepLogger.caseId = 1004;

    stepLogger.step(' Precondition - Navigate to budgting app page');
    // covered in before each 
    stepLogger.step(' Step 1 - Navigate to budget page');
    stepLogger.step('Verification - Verify budget page is displayed');
    await BudgetPageHelper.verifyBudgetPageIsDisplayed();

    stepLogger.step(' Step 2 - enter Description and leave value field empty');
    await BudgetPageHelper.enterDescription();
    stepLogger.step('Verification - Verify add button is disabled');
    await BudgetPageHelper.addButtonDisabled();

    stepLogger.step(' Step 3 - reload page and enter value and leave description empty');
    await PageHelper.refreshPage();
    await BudgetPageHelper.enterValue();
    stepLogger.step('Verification - Verify add button is disabled');
    await BudgetPageHelper.addButtonDisabled();

    stepLogger.step(' Step 4 - reload page and enter both value and description');
    await PageHelper.refreshPage();
    await BudgetPageHelper.enterDescription();
    await BudgetPageHelper.enterValue();
    stepLogger.step('Verification - Verify add button is enabled');
    await BudgetPageHelper.addButtonEnabled();
  });

  it('Vertical scroll bar is displayed if budget list entries exceed avaialble space - TC1009', async () => {
    stepLogger.caseId = 1009;

    stepLogger.step(' Precondition - Navigate to budgting app page');
    // covered in before each 
    stepLogger.step(' Step 1 - Navigate to budget page');
    stepLogger.step('Verification - Verify budget page is displayed');
    await BudgetPageHelper.verifyBudgetPageIsDisplayed();

    stepLogger.step(' Step 2 - add 5 new budget entries');
    await BudgetPageHelper.addNewBudgetEntries(stepLogger, 5);
    stepLogger.step('Verification - Vertical scroll bar is displayed');
    WaitHelper.sleep(PageHelper.timeout.s);
    await BudgetPageHelper.verifyVerticalScrollBarIsDisplayed();
  });
});
