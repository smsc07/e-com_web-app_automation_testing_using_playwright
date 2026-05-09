import { Page } from '@playwright/test';
import { testData } from '../test-data/testData';

export class LoginPage{

    private page: Page;

    constructor(page:Page){ //This class receives the browser page from PW
        this.page = page;
    }

    //Locators
    username = '[data-test="username"]';
    password = '[data-test="password"]';
    logInBtn = '[data-test="login-button"]';
    errorMsg = '[data-test="error"]';

    //Actions
    async navigate() {
        await  this.page.goto(testData.base_url);
    }

    async login(user:string, pass:string){
        await this.page.fill(this.username,user);
        await this.page.fill(this.password,pass);
        await this.page.click(this.logInBtn);
    }

    async getErrorMessage() {
        return this.page.textContent(this.errorMsg);
    }

}