import { Page, Locator, expect } from '@playwright/test';
import { testData } from '../test-data/testData';
import { CartPage } from './CartPage';

export class ProductPage{

    //Locators
    private page: Page;
    readonly inventoryList: Locator;
    readonly inventoryItem: Locator;
    readonly inventoryItemImg: Locator;
    readonly inventoryItemDes: Locator;
    readonly shopppingCartBadge: Locator;
    readonly shoppingCartLinkIcon: Locator;
    readonly secondaryHeader: Locator;
    
    //Variables
    addedItems: string[] = [];
    private cartPage1 = "Your Cart";
    private removeBtnCSS = 'btn btn_secondary btn_small btn_inventory ';

    constructor(page:Page){
        this.page = page,
        this.inventoryList = this.page.locator('[data-test="inventory-list"]');
        this.inventoryItem = this.page.locator('[data-test="inventory-item"]');
        this.inventoryItemImg = this.page.locator('[data-test="inventory-item_img"]');
        this.inventoryItemDes = this.page.locator('[data-test="inventory-item-description"]');
        this.shopppingCartBadge = this.page.locator('[data-test="shopping-cart-badge"]');
        this.shoppingCartLinkIcon = this.page.locator('[data-test="shopping-cart-link"]');
        this.secondaryHeader = this.page.locator('[data-test="secondary-header"]');
        this.addedItems = [];
    }

    async navigateToProductsPage() {
        
        return await this.page.goto(testData.base_url + '/inventory.html');
    }
    async navigateToYourCartPage() {

        await this.shoppingCartLinkIcon.click();
        await expect(this.secondaryHeader).toBeVisible();
        await expect(this.secondaryHeader).toHaveText(this.cartPage1);

    }
    async itemImagesVisibilityCheck() {

        const items = this.page.locator('[data-test^="item-"][data-test$="-img-link"]');
        const count = await items.count();

        for (let i = 0; i < count; i++) {
            await expect(items.nth(i)).toBeVisible();
        }
    }
    async itemDesCountAndVisibilityCheck() {

        const count = await this.inventoryItemDes.count();
        await expect(this.inventoryItemDes).toHaveCount(count);

        //for loop to check the item description one-by-one
        for (let i = 0; i < count; i++) {
            await expect(this.inventoryItemDes.nth(i)).toBeVisible();
        };

    }
    async addItem(inventoryName: string, addToCartBtn: string, removeToCartBtn:string){

        //Add item to array
        this.addedItems.push(inventoryName)

        //click add to cart button
        return await expect(this.page.locator(addToCartBtn)).toBeVisible(),
        await this.page.locator(addToCartBtn).click(),

        //check button change
        await expect(this.page.locator(removeToCartBtn)).toBeVisible(),
        await expect(this.page.locator(removeToCartBtn)).toHaveClass(this.removeBtnCSS);

    }
    async deleteItemsOnCart(){

        this.addedItems = [];

    }
    async countShoppingCartItem(){

        await expect(await this.shopppingCartBadge).toHaveText(this.addedItems.length.toString());

    }

}
