import { expect, Locator, Page } from '@playwright/test';
import { testData } from '../test-data/testData';

export class CartPage {

    //Locators
    private page: Page;
    readonly secondaryHeader: Locator;
    readonly inventoryItem: Locator;
    readonly inventoryItemName: Locator;
    readonly checkoutBtn: Locator;
    readonly checkoutPageTitle: Locator;

    //Variables
    private btnLocator = '';
    private checkoutPage1 = 'Checkout: Your Information';

    constructor(page:Page){
        this.page = page;
        this.secondaryHeader = this.page.locator('[data-test="secondary-header"]');
        this.inventoryItem = this.page.locator('[data-test="inventory-item"]');
        this.checkoutBtn = this.page.locator('[data-test="checkout"]');
        this.checkoutPageTitle = this.page.locator('[data-test="title"]');
        this.inventoryItemName = this.page.locator('[data-test="inventory-item-name"]');
    }

    async navigateToCartPage() {
        return await this.page.goto(testData.base_url + '/cart.html')
    }
    async checkItemsAddedToCart(itemsAddedToCart: Array<string>) {

        let matchItemCounter = 0;

        for (let i = 0; i < await this.inventoryItem.count(); i++) {
            const inventoryItemName = await this.inventoryItemName.nth(i).textContent();

            if (inventoryItemName === itemsAddedToCart[i]) {
                matchItemCounter++;
            }
        }

        if (matchItemCounter === await itemsAddedToCart.length) {
            return console.log('All items are listed correctly in Your Cart page.');
        }else{
            return console.log('Missing items found.');;
        }

    }
    async navigateToCheckoutPage(){

        await this.checkoutBtn.click();
        await expect(this.checkoutPageTitle).toBeVisible();
        await expect(this.checkoutPageTitle).toHaveText(this.checkoutPage1);

    }

}