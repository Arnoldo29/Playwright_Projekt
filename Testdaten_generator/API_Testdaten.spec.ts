import { test, expect } from '@playwright/test';
import { log } from 'console';
import { promises as fs } from 'fs';
import path from 'path';
import axios from 'axios'; // Fügen Sie Axios hinzu, um mit der API zu kommunizieren

test('Daten für CoffeeShop-Webseite verwenden', async ({ page }) => {
    const COFFEESHOP_URL = process.env.COFFEESHOP_URL || 'http://10.40.226.38/Bootcamp_Bench/index.php';

    // API URL
    const API_URL = process.env.API_URL || 'http://127.0.0.1:8001/generate/registrierung/1'; // Beispiel für 1 registrierung Datensatz
    let testData = null;

    try {
        // Lade Testdaten von der API
        const response = await axios.get(API_URL);
        testData = response.data;
        console.log('Testdaten erfolgreich abgerufen:', testData);
    } catch (error) {
        throw new Error('Fehler beim Abrufen der Testdaten von der API: ' + error.message);
    }

    // Prüfen, ob Registrierungsdaten in der API-Antwort vorhanden sind
    if (
        !testData.gültige_daten ||
        !Array.isArray(testData.gültige_daten) ||
        testData.gültige_daten.length === 0
    ) {
        throw new Error("🚨 Fehler: Keine gültigen Registrierungsdaten in der API-Antwort gefunden!");
    }

    let validUser = null;
    const validUsers = testData.gültige_daten;
    
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
        console.log(`🔑 Passwort_wiederholen: ${passwordRepeat}`);

        // CoffeeShop-Webseite aufrufen
        await page.goto(COFFEESHOP_URL);
        console.log("📌 CoffeeShop-Webseite geladen");

        // Prüfen, ob das Logo vorhanden ist
        expect(await page.$('#headlogo')).not.toBeNull();
        console.log("✅ Logo ist vorhanden");

        // Überprüfen, ob der Account-Button vorhanden ist, bevor darauf geklickt wird
        const accountButton = page.locator('#accountbar > a');
        const accountButtonVisible = await accountButton.isVisible();
        if (!accountButtonVisible) {
            throw new Error("🚨 Fehler: Account-Button ist nicht sichtbar!");
        }
        // Auf den Account-Button klicken
        await accountButton.click();
        console.log("✅ Auf Accountbar geklickt");
        await page.waitForTimeout(2000);

        // Prüfen, ob die Login-Überschrift existiert
        await expect(page.locator('#loginContainer > h2')).toBeVisible();
        console.log("✅ Login-Container Überschrift gefunden");

        // Überprüfen, ob der Registrierungs-Link vorhanden ist, bevor darauf geklickt wird
        const registerLink = page.locator('#loginContainer > div > a');
        const registerLinkVisible = await registerLink.isVisible();
        if (!registerLinkVisible) {
            throw new Error("🚨 Fehler: Registrierungs-Link ist nicht sichtbar!");
        }
        // Auf den Registrierungs-Link klicken
        await registerLink.click();
        console.log("✅ Auf Registrierung geklickt");

        // Warten, bis das Passwort-Wiederholungsfeld sichtbar ist
        await page.waitForSelector('#register-pwrep', { state: 'visible', timeout: 10000 });

        // Warten, bis das Passwortfeld sichtbar und interaktiv ist
        await page.waitForSelector('#register-pw', { state: 'visible', timeout: 10000 });
        if (!(await page.locator('#register-pw').isEnabled())) {
            throw new Error("🚨 Fehler: Passwortfeld ist nicht aktiviert.");
        }

        // Prüfen, ob das Feld nicht disabled ist
        await page.waitForFunction(() => {
            const input = document.querySelector('#register-pw') as HTMLInputElement;
            return input && !input.disabled;
        });

        // Prüfen, ob das Feld nicht disabled ist
        await page.waitForFunction(() => {
            const input = document.querySelector('#register-pwrep') as HTMLInputElement;
            return input && !input.disabled;
        });

        // Debugging: Überprüfen Sie den Zustand des Passwortfelds
        const isVisible = await page.locator('#register-pw').isVisible();
        const isEnabled = await page.locator('#register-pw').isEnabled();
        console.log(`🔍 Passwortfeld sichtbar: ${isVisible}`);
        console.log(`🔍 Passwortfeld aktiviert: ${isEnabled}`);

        // Scrollen Sie zum Passwortfeld
        await page.locator('#register-pw').scrollIntoViewIfNeeded();

        // Registrierungsformular ausfüllen
        await page.type('#register-username', username, { delay: 100 });
        await page.type('#register-pw', password, { delay: 100 });
        await page.type('#register-pwrep', passwordRepeat, { delay: 100 });
        console.log("✅ Registrierungsformular ausgefüllt");

        // Prüfen, ob die eingegebenen Daten gültig sind
        const usernameMessage = await page.locator('#usrmsg').textContent();
        const userError = await page.locator('#repwmsg').textContent();
        const passwordError = await page.locator('#pwmsg').textContent();

        if (
            usernameMessage?.includes("Dieser Name ist verfügbar") &&
            (!userError || !userError.includes("Die Passwörter stimmen nicht überein")) &&
            (!passwordError || !passwordError.includes("8-20 Zeichen: a-z, A-Z, 0-9, @$!%*?"))
        ) {
            console.log("✅ Gültige Testdaten gefunden, Registrierung wird fortgesetzt.");
            validUser = randomUser;
            break;
        } else {
            console.log(`⚠️ Ungültige Daten: ${usernameMessage || ''} ${userError || ''} ${passwordError || ''}`);
            validUsers.splice(randomIndex, 1); // Entferne ungültige Daten
            continue;
        }
    }

    if (!validUser) {
        throw new Error("❌ Keine gültigen Testdaten gefunden.");
    }

    // Überprüfen, ob die AGB-Checkbox vorhanden ist, bevor sie aktiviert wird
    const checkbox = page.locator('#register-check');
    const checkboxVisible = await checkbox.isVisible();
    if (!checkboxVisible) {
        throw new Error("🚨 Fehler: AGB-Checkbox ist nicht sichtbar!");
    }
    // AGB-Checkbox aktivieren
    await page.check('#register-check');
    console.log("✅ AGB akzeptiert");

    // Überprüfen, ob der Button zum Absenden der Registrierung vorhanden ist
    const submitButton = page.locator('body > content > div:nth-child(2) > div > form > div.reg.btn > input');
    const submitButtonVisible = await submitButton.isVisible();
    if (!submitButtonVisible) {
        throw new Error("🚨 Fehler: Registrierungs-Button ist nicht sichtbar!");
    }
    // Registrierung abschicken
    await submitButton.click();
    console.log("✅ Registrierung abgeschickt");

    // Prüfen, ob die Erfolgsmeldung angezeigt wird
    const successMessage = await page.locator('#overlaysubmit > h2').filter({ hasText: "Deine Registrierung war erfolgreich!" });
    const confirmButton = page.locator('#overlaysubmit > button').filter({ hasText: "OK" });

    if (await successMessage.isVisible()) {
        console.log("✅ Erfolgsmeldung erhalten: 'Deine Registrierung war erfolgreich!'");

        // Warten, bis der OK-Button sichtbar ist und dann klicken
        await confirmButton.isVisible();
        await confirmButton.click();

        console.log("✅ OK-Button geklickt");
    } else {
        console.log(`⚠️ Keine gültige Erfolgsmeldung gefunden. Erhalten: '${successMessage || "Keine Nachricht"}'`);
    }

    // Zurück zur Hauptseite
    await page.goto(COFFEESHOP_URL);
    console.log("📌 Zurück zur Hauptseite");

    // Überprüfen, ob der Login-Button vorhanden ist, bevor darauf geklickt wird
    const loginButton = page.locator('#accountbar > a');
    const loginButtonVisible = await loginButton.isVisible();
    if (!loginButtonVisible) {
        throw new Error("🚨 Fehler: Login-Button ist nicht sichtbar!");
    }
    // Erneut auf Login klicken
    await loginButton.click();
    console.log("✅ Auf Login geklickt");

    // Überprüfen, ob die Login-Felder vorhanden sind, bevor sie ausgefüllt werden
    const usernameField = page.locator('#login-username');
    const passwordField = page.locator('#login-password');
    const usernameFieldVisible = await usernameField.isVisible();
    const passwordFieldVisible = await passwordField.isVisible();
    if (!usernameFieldVisible || !passwordFieldVisible) {
        throw new Error("🚨 Fehler: Login-Felder sind nicht sichtbar!");
    }

    // Login-Felder ausfüllen
    await page.type('#login-username', validUser.benutzername, { delay: 200 });
    await page.type('#login-password', validUser.passwort, { delay: 200 });
    console.log("✅ Login-Formular ausgefüllt");

    // Überprüfen, ob der Login-Button sichtbar ist, bevor er geklickt wird
    const loginSubmitButton = page.locator('#login-submit');
    const loginSubmitButtonVisible = await loginSubmitButton.isVisible();
    if (!loginSubmitButtonVisible) {
        throw new Error("🚨 Fehler: Login-Absenden-Button ist nicht sichtbar!");
    }
    // Login absenden
    await loginSubmitButton.click();
    console.log("✅ Login abgeschickt");

    // Überprüfen, ob der Login erfolgreich war (Logout-Button sichtbar)
    //await expect(page.locator('#logout-button')).toBeVisible();
    console.log("🎉 Erfolgreich eingeloggt!");
});
