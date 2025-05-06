import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../Pages/RegistrationPage';
import { LoginPage } from '../Pages/LoginPage';
import { promises as fs } from 'fs';
import path from 'path';

test.describe('@PlaywrightWithJenkins', () => {
test('Daten für CoffeeShop-Webseite verwenden', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    const loginPage = new LoginPage(page);

    const COFFEESHOP_URL = 'http://10.40.226.38/Bootcamp_Bench/index.php';

    // Lade Testdaten aus der Datei
    const testDataPath = path.resolve(__dirname, '../test-data/coffeeshop_testdata.json');
    const rawData = await fs.readFile(testDataPath, 'utf-8');
    const testData = JSON.parse(rawData);

    // Prüfen, ob Registrierungsdaten in der JSON-Datei vorhanden sind
    if (!testData.registrierung || !Array.isArray(testData.registrierung.gültige_daten) || testData.registrierung.gültige_daten.length === 0) {
        throw new Error("🚨 Fehler: Keine gültigen Registrierungsdaten in der JSON-Datei gefunden!");
    }

    let validUser = null;
    const validUsers = testData.registrierung.gültige_daten;

    // Wiederhole, bis gültige Testdaten gefunden werden
    while (validUsers.length > 0) {
        const randomIndex = Math.floor(Math.random() * validUsers.length);
        const randomUser = validUsers[randomIndex];

        // Prüfen, ob Benutzername und Passwort vorhanden sind
        if (!randomUser.benutzername || !randomUser.passwort) {
            validUsers.splice(randomIndex, 1); // Ungültige Daten entfernen
            continue;
        }

        const username = randomUser.benutzername;
        const password = randomUser.passwort.trim();
        const passwordRepeat = password; // Passwort-Wiederholung

        console.log("🔹 Verwendete Testdaten:");
        console.log(`👤 Benutzername: ${username}`);
        console.log(`🔑 Passwort: ${password}`);
        console.log(`🔑 Passwort_widerholen: ${passwordRepeat}`)

        // Registrierung durchführen
        await registrationPage.navigateTo();
        await registrationPage.fillRegistrationForm(username, password);
        await registrationPage.agreeToTerms();
        await registrationPage.submitRegistration();

        // Prüfen, ob eine Erfolgsmeldung erscheint
        const successMessage = await page.locator('#overlaysubmit > h2').filter({ hasText: "Deine Registrierung war erfolgreich!" });
        if (await successMessage.isVisible()) {
            console.log("✅ Registrierung erfolgreich!");
            validUser = randomUser; // Gültige Testdaten gefunden
            break;
        } else {
            validUsers.splice(randomIndex, 1); // Ungültige Daten entfernen
            console.log(`⚠️ Ungültige Daten: ${username}`);
        }
    }

    if (!validUser) {
        throw new Error("❌ Keine gültigen Testdaten gefunden.");
    }

    // Login durchführen
    await loginPage.navigateTo();
    await loginPage.clickLoginButton();
    await loginPage.fillLoginForm(validUser.benutzername, validUser.passwort);
    await loginPage.submitLogin();

    // Überprüfen, ob der Login erfolgreich war
    //const loginSuccess = await loginPage.isLoginSuccessful();
    //expect(loginSuccess).toBeTruthy();
});
});
