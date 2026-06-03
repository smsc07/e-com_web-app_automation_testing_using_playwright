import { expect, Locator, Page } from '@playwright/test';
import { testData } from '../test-data/testData';

export class CheckoutPage {

    //Locators
    private page: Page;
    readonly firstNameField: Locator;
    readonly LastNameField: Locator;
    readonly postalCode: Locator;
    readonly continueToCheckoutOverviewPageBtn: Locator;
    readonly checkoutOverviewPageTitle: Locator;
    readonly inventoryItem: Locator;
    readonly inventoryItemName: Locator;
    readonly paymentInfoValue: Locator;
    readonly shippingInfoValue: Locator;
    readonly inventoryItemPrice: Locator;
    

    //Variables
    private checkoutPage1 = 'Checkout: Your Information';
    private checkoutPage2 = 'Checkout: Overview';
    private firstNameData = testData.buyerData.firstNameData;
    private lasNameData = testData.buyerData.lasNameData;
    private postalCodeData = testData.buyerData.postalCodeData;
    private paymentInfoValueData = testData.buyerData.paymentInfoValueData;
    private shippingInfoValueData = testData.buyerData.shippingInfoValueData;
    private InventoryItemPrices: string[] = [];

    constructor(page:Page){
        this.page = page;
        this.firstNameField = this.page.locator('[data-test="firstName"]');
        this.LastNameField = this.page.locator('[data-test="lastName"]');
        this.postalCode = this.page.locator('[data-test="postalCode"]');
        this.continueToCheckoutOverviewPageBtn = this.page.locator('[data-test="continue"]');
        this.checkoutOverviewPageTitle = this.page.locator('[data-test="title"]');
        this.inventoryItem = this.page.locator('[data-test="inventory-item"]');
        this.inventoryItemName = this.page.locator('[data-test="inventory-item-name"]');
        this.paymentInfoValue = this.page.locator('[data-test="payment-info-value"]');
        this.shippingInfoValue = this.page.locator('[data-test="shipping-info-value"]');
        this.inventoryItemPrice = this.page.locator('[data-test="inventory-item-price"]');
    }

    async fillOutInformationForm(){

        await this.firstNameField.fill(this.firstNameData);
        await this.LastNameField.fill(this.lasNameData);
        await this.postalCode.fill(this.postalCodeData);

    }
    async navigateToCheckoutOverviewPage() {

        await this.continueToCheckoutOverviewPageBtn.click();
        await expect(this.checkoutOverviewPageTitle).toBeVisible();
        await expect(this.checkoutOverviewPageTitle).toHaveText(this.checkoutPage2);

    }
    async checkItemsListedOnCheckoutOverview(itemsAddedToCart: Array<string>) {

        let matchItemCounter = 0;

        for (let i = 0; i < await this.inventoryItem.count(); i++) {
            const inventoryItemName = await this.inventoryItemName.nth(i).textContent();

            if (inventoryItemName === itemsAddedToCart[i]) {
                matchItemCounter++;
            }
        }

        if (matchItemCounter === await itemsAddedToCart.length) {
            return console.log('All items are listed correctly in Checkout: Overview page.');
        }else{
            return console.log('Missing items found.');;
        }

    }
    async verifyCheckOutInformation(){

        await expect(this.paymentInfoValue).toBeVisible();
        await expect(this.paymentInfoValue).toHaveText(this.paymentInfoValueData);
        await expect(this.shippingInfoValue).toBeVisible();
        await expect(this.shippingInfoValue).toHaveText(this.shippingInfoValueData);

    }

    async verifyComputedItemTotal(){

        let inventoryItemPrices  = await this.inventoryItemPrice.allTextContents();

        const total = inventoryItemPrices.map(price => parseFloat(price.replace('$', '')))
        .reduce((acc, curr) => acc + curr, 0);

        const finalTotal = Math.round(total * 100) / 100;
        console.log('Total: $ ' + finalTotal);

        //WIP
        //Check if Item total: $ is correct

    }


}