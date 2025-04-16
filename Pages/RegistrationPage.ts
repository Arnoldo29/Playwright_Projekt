import { Page, Locator } from '@playwright/test';

export class RegistrationPage {
    readonly page: Page;
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly passwordRepeatField: Locator;
    readonly agreeCheckbox: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameField = page.locator('#register-username');
        this.passwordField = page.locator('#register-pw');
        this.passwordRepeatField = page.locator('#register-pwrep');
        this.agreeCheckbox = page.locator('#register-check');
        this.submitButton = page.locator('body > content > div:nth-child(2) > div > form > div.reg.btn > input');
    }

    async navigateTo() {
        await this.page.goto('http://10.40.226.38/Bootcamp_Bench/index.php');
        console.log("📌 CoffeeShop-Webseite geladen");

        const accountButton = this.page.locator('#accountbar > a');
        await accountButton.click();
        console.log("✅ Auf Accountbar geklickt");

        const registerLink = this.page.locator('#loginContainer > div > a');
        await registerLink.click();
        console.log("✅ Auf Registrierung geklickt");
    }

    async fillRegistrationForm(username: string, password: string) {
        await this.usernameField.type(username, { delay: 100 });
        await this.passwordField.type(password, { delay: 100 });
        await this.passwordRepeatField.type(password, { delay: 100 });
        console.log("✅ Registrierungsformular ausgefüllt");
    }

    async agreeToTerms() {
        await this.agreeCheckbox.check();
        console.log("✅ AGB akzeptiert");
    }

    async submitRegistration() {
        await this.submitButton.click();
        console.log("✅ Registrierung abgeschickt");
    }
}
