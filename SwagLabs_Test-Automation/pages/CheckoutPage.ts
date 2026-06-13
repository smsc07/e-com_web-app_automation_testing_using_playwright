import { expect, Locator, Page } from '@playwright/test';
import { testData } from '../test-data/testData';

export class CheckoutPage {

    //Properties / Locators
    readonly page: Page;
    readonly firstNameField: Locator;
    readonly LastNameField: Locator;
    readonly postalCode: Locator;
    readonly continueToCheckoutOverviewPageBtn: Locator;
    readonly continueToCheckoutCompletePageBtn: Locator;
    readonly checkoutOverviewPageTitle: Locator;
    readonly checkoutCompletePageTitle: Locator;
    readonly inventoryItem: Locator;
    readonly inventoryItemName: Locator;
    readonly paymentInfoValue: Locator;
    readonly shippingInfoValue: Locator;
    readonly inventoryItemPrice: Locator;
    readonly subTotalLabel: Locator;
    readonly taxLabel: Locator;
    readonly totalLabel: Locator;
    readonly completePurchaseHeader: Locator;    
    readonly completePurchaseText: Locator;

    //Variables
    private checkoutPage1 = 'Checkout: Your Information';
    private checkoutPage2 = 'Checkout: Overview';
    private checkoutPage3 = 'Checkout: Complete!';
    private firstNameData = testData.buyerData.firstNameData;
    private lasNameData = testData.buyerData.lasNameData;
    private postalCodeData = testData.buyerData.postalCodeData;
    private paymentInfoValueData = testData.buyerData.paymentInfoValueData;
    private shippingInfoValueData = testData.buyerData.shippingInfoValueData;
    private InventoryItemPrices: string[] = [];
    private itemTotal: number = 0;
    private taxTotal: number = 0;
    private expectedCompletePurchaseHeader = 'Thank you for your order!';
    private expectedCompletePurchaseText = 'Your order has been dispatched, and will arrive just as fast as the pony can get there!';

    constructor(page:Page){
        this.page = page;
        this.firstNameField = this.page.locator('[data-test="firstName"]');
        this.LastNameField = this.page.locator('[data-test="lastName"]');
        this.postalCode = this.page.locator('[data-test="postalCode"]');
        this.continueToCheckoutOverviewPageBtn = this.page.locator('[data-test="continue"]');
        this.continueToCheckoutCompletePageBtn = this.page.locator('[data-test="finish"]');
        this.checkoutOverviewPageTitle = this.page.locator('[data-test="title"]');
        this.checkoutCompletePageTitle = this.page.locator('[data-test="title"]');
        this.inventoryItem = this.page.locator('[data-test="inventory-item"]');
        this.inventoryItemName = this.page.locator('[data-test="inventory-item-name"]');
        this.paymentInfoValue = this.page.locator('[data-test="payment-info-value"]');
        this.shippingInfoValue = this.page.locator('[data-test="shipping-info-value"]');
        this.inventoryItemPrice = this.page.locator('[data-test="inventory-item-price"]');
        this.subTotalLabel = this.page.locator('[data-test="subtotal-label"]');
        this.taxLabel = this.page.locator('[data-test="tax-label"]');
        this.totalLabel = this.page.locator('[data-test="total-label"]');
        this.completePurchaseHeader = this.page.locator('[data-test="complete-header"]');
        this.completePurchaseText = this.page.locator('[data-test="complete-text"]'); 
    }

    async fillOutInformationForm(){

        await this.firstNameField.fill(this.firstNameData);
        await this.LastNameField.fill(this.lasNameData);
        await this.postalCode.fill(this.postalCodeData);

    }
    async navigateToCheckoutOverviewPage(){

        await this.continueToCheckoutOverviewPageBtn.click();
        await expect(this.checkoutOverviewPageTitle).toBeVisible();
        await expect(this.checkoutOverviewPageTitle).toHaveText(this.checkoutPage2);

    }
    async navigateToCheckoutCompletePage(){

        await this.continueToCheckoutCompletePageBtn.click();
        await expect(this.checkoutCompletePageTitle).toBeVisible();
        await expect(this.checkoutCompletePageTitle).toHaveText(this.checkoutPage3);

    }
    async checkItemsListedOnCheckoutOverview(itemsAddedToCart: Array<string>){

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

        let itemTotal = this.itemTotal = Math.round(total * 100) / 100;


        const expectedItemTotalDisplayed: string = 'Item total: $' + itemTotal;
        const actualItemTotalDisplayed = await this.subTotalLabel.textContent();

        if (expectedItemTotalDisplayed === actualItemTotalDisplayed) {
            console.log(expectedItemTotalDisplayed + " - Displayed as expected.");
        }else {
            console.log("Unexpected Item Total Displayed!");
        }

    }
    async verifyTax(){

        let itemTotal = this.itemTotal;
        let taxRate = testData.otherData.taxPercentage;
        const tax = this.taxTotal = Number((itemTotal * taxRate).toFixed(2));

        const expectedTaxDisplayed: string = 'Tax: $' + tax;
        const actualTaxDisplayed = await this.taxLabel.textContent();

        if (expectedTaxDisplayed === actualTaxDisplayed) {
            console.log(expectedTaxDisplayed + " - Displayed as expected.");
        }else {
            console.log("Unexpected Tax Displayed!");
        }

    }
    async verifyTotal(){

        const total = this.itemTotal! + this.taxTotal!;

        const expectedTotalDisplayed: string = 'Total: $' + total;
        const actualTotalDisplayed = await this.totalLabel.textContent();

        if (expectedTotalDisplayed === actualTotalDisplayed) {
            console.log(expectedTotalDisplayed + " - Displayed as expected.");
        }else {
            console.log("Unexpected Tax Displayed!");
        }

    }
    async verifyCompletePurchaseHeaderAndText(){

        if ( await this.completePurchaseHeader.textContent() === this.expectedCompletePurchaseHeader) {

            if (await this.completePurchaseText.textContent() === this.expectedCompletePurchaseText) {
                console.log('Success Purchase Message - Displayed as expected.');
            } else {
                console.log("Error: Please Check Complete Purchase Header and Text!");
            }
            
        }else {
            console.log("Error: Please Check Complete Purchase Header and Text!");
        }

    }


}