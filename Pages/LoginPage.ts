import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;
    readonly loginSubmitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameField = page.locator('#login-username');
        this.passwordField = page.locator('#login-password');
        this.loginButton = page.locator('#accountbar > a');
        this.loginSubmitButton = page.locator('#login-submit');
    }

    async navigateTo() {
        await this.page.goto('http://10.40.226.38/Bootcamp_Bench/index.php');
        console.log("📌 CoffeeShop-Webseite geladen");
    }

    async clickLoginButton() {
        await this.loginButton.click();
        console.log("✅ Auf Login geklickt");
    }

    async fillLoginForm(username: string, password: string) {
        await this.usernameField.type(username, { delay: 100 });
        await this.passwordField.type(password, { delay: 100 });
        console.log("✅ Login-Formular ausgefüllt");
    }

    async submitLogin() {
        await this.loginSubmitButton.click();
        console.log("✅ Login abgeschickt");
    }

    //async isLoginSuccessful() {
      //  const successMessage = this.page.locator('#logout-button');
        //const isVisible = await successMessage.isVisible();
        //if (!isVisible) {
          //  console.log("❌ Login nicht erfolgreich.");
       // }
        //return isVisible;
    //}
}
