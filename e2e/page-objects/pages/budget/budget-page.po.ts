import { By, element } from 'protractor';

export class BudgetPage {

    static get pageTitle() {
        return element(By.css('[id*=PageTab-title]'));
    }

    static get categoryDropDownButton() {
        return element(By.name('categoryId'));
    }

    static categoryDropDownItem(option: number) {
        return element(By.xpath(`//select/option[${option}]`));
    }

    static get addButton() {
        return element(By.xpath(`//button[@type='submit']`));
    }

    static get addButtonDisabled() {
        return element(By.xpath(`//button[@type='submit' and @disabled]`));
    }

    static get value() {
        return element(By.name('value'));
    }

    static get description() {
        return element(By.name('description'));
    }

    static budgetListItemDescriptionByPosition(position: number, description: string) {
        return element(By.xpath(`//table//tr[${position}]//td[contains(text(), '${description}')]`));
    }

    static get budgetListItemsCount() {
        return element.all(By.xpath('//table//tr')).count();
    }

    static budgetListTable() {
        return element(By.css('div.root'));
    }
}
