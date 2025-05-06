import { test, expect } from '@playwright/test';
import axios from 'axios';

test.describe('@PlaywrightWithJenkins', () => {
test('Ungültige Daten für CoffeeShop-Webseite verwenden', async ({ page }) => {
    const COFFEESHOP_URL = 'http://10.40.226.38/Bootcamp_Bench/index.php';
    const API_URL = 'http://127.0.0.1:8001/generate/registrierung/5';

    let testData = null;

    try {
        const response = await axios.get(API_URL);
        testData = response.data;
        console.log('✅ Testdaten erfolgreich abgerufen:', testData);
    } catch (error) {
        throw new Error('Fehler beim Abrufen der Testdaten von der API: ' + error.message);
    }

    if (!testData.ungültige_daten || !Array.isArray(testData.ungültige_daten) || testData.ungültige_daten.length === 0) {
        throw new Error("🚨 Fehler: Keine ungültigen Registrierungsdaten in der API-Antwort gefunden!");
    }

    const invalidUser = testData.ungültige_daten[Math.floor(Math.random() * testData.ungültige_daten.length)];
    const username = invalidUser.benutzername;
    const password = invalidUser.passwort.trim();
    const passwordRepeat = password;

    console.log("🔹 Verwendete ungültige Testdaten:");
    console.log(`👤 Benutzername: ${username}`);
    console.log(`🔑 Passwort: ${password}`);
    console.log(`🔑 Passwort wiederholen: ${passwordRepeat}`);

    await page.goto(COFFEESHOP_URL);
    console.log("📌 CoffeeShop-Webseite geladen");

    expect(await page.$('#headlogo')).not.toBeNull();
    console.log("✅ Logo ist vorhanden");

    const accountButton = page.locator('#accountbar > a');
    if (!(await accountButton.isVisible())) {
        throw new Error("🚨 Fehler: Account-Button ist nicht sichtbar!");
    }
    await accountButton.click();
    console.log("✅ Auf Accountbar geklickt");
    await page.waitForTimeout(2000);

    await expect(page.locator('#loginContainer > h2')).toBeVisible();
    console.log("✅ Login-Container Überschrift gefunden");

    const registerLink = page.locator('#loginContainer > div > a');
    if (!(await registerLink.isVisible())) {
        throw new Error("🚨 Fehler: Registrierungs-Link ist nicht sichtbar!");
    }
    await registerLink.click();
    console.log("✅ Auf Registrierung geklickt");

    await page.waitForSelector('#register-pwrep', { state: 'visible', timeout: 10000 });
    await page.waitForSelector('#register-pw', { state: 'visible', timeout: 10000 });

    await page.waitForFunction(() => {
        const pw = document.querySelector('#register-pw') as HTMLInputElement;
        return pw && !pw.disabled;
    });

    await page.waitForFunction(() => {
        const pwrep = document.querySelector('#register-pwrep') as HTMLInputElement;
        return pwrep && !pwrep.disabled;
    });

    await page.locator('#register-pw').scrollIntoViewIfNeeded();

    await page.type('#register-username', username, { delay: 100 });
    await page.type('#register-pw', password, { delay: 100 });
    await page.type('#register-pwrep', passwordRepeat, { delay: 100 });
    console.log("✅ Registrierungsformular ausgefüllt");

    // Fehlertext abfragen
    const usernameMessage = (await page.locator('#usrmsg').textContent())?.trim() || '';
    const passwordMessage = (await page.locator('#pwmsg').textContent())?.trim() || '';
    const repwMessage = (await page.locator('#repwmsg').textContent())?.trim() || '';

    // Einzelne Fehlermeldungen prüfen
    let usernameErrorDetected = false;
    let passwordErrorDetected = false;

    if (usernameMessage.includes("gültigen Namen eingeben")) {
        usernameErrorDetected = true;
        console.log("✅ Fehlermeldung für Benutzername erkannt.");
    } else {
        throw new Error("❌ Die Fehlermeldung für Benutzername wird nicht angezeigt!");
    }

    if (passwordMessage.includes("8-20 Zeichen")) {
        passwordErrorDetected = true;
        console.log("✅ Fehlermeldung für Passwort erkannt.");
    } else {
        throw new Error("❌ Die Fehlermeldung für den Passwort wird nicht angezeigt!");
    }

    if (repwMessage.includes("stimmen nicht überein")) {
        console.log("⚠️ Hinweis: Fehlermeldung für Passwortwiederholung wurde erkannt.");
    } else {
        console.log("ℹ️ Keine Fehlermeldung für Passwortwiederholung – wird in diesem Test nicht benötigt.");
    }

    // Test als bestanden markieren, wenn Benutzername & Passwort Fehler erkannt wurden
    if (usernameErrorDetected && passwordErrorDetected) {
        console.log("✅ Fehlerhafte Eingaben wurden erkannt – Test erfolgreich abgeschlossen.");
    } else {
        throw new Error("❌ Fehler: Nicht alle erwarteten Fehlermeldungen wurden erkannt.");
    }
});
});
