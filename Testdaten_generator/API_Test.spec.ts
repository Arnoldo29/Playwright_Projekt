/*import { test, expect } from '@playwright/test';
import path from 'path';
import {allure} from 'allure-playwright';
import { ExportPage } from '../Pages/API_Test.page';


const BASE_URL = 'http://localhost:8000';
const UI_URL = 'http://localhost:8501';

// Test 1: API – Testdatengenerator abrufen und prüfen

test('API - Testdaten generieren', async ({ request }) => {
    console.log('Starte den Test: API - Testdaten generieren');

    console.log('Sende GET-Anfrage an:', `${BASE_URL}/generate/registrierung/5`);
    const response = await request.get(`${BASE_URL}/generate/registrierung/5`);
    console.log('Antwortstatus:', response.status());
    expect(response.status()).toBe(200);

    const jsonData = await response.json();
    console.log('Antwortdaten:', jsonData);

    console.log('Überprüfe die Anzahl der generierten Datensätze');
    expect(jsonData.length).toBe(5);

    console.log('Überprüfe, ob der erste Datensatz das Attribut "benutzername" enthält');
    expect(jsonData[0]).toHaveProperty('benutzername');

    console.log('Test erfolgreich abgeschlossen');
}); */

/*const API_URL = 'http://localhost:8501/api/run-test';


test('API - Testdaten generieren und auf Web-API ausführen', async ({ request }) => {
    console.log('Starte den Test: API - Testdaten generieren und auf Web-API ausführen');

    const apiResponse = await request.post(API_URL, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    console.log('Antwortstatus der Web-API:', apiResponse.status());
    expect(apiResponse.status()).toBe(200);

    const responseBody = await apiResponse.json();
    console.log('Antwortdaten der Web-API:', responseBody);

    expect(responseBody.status).toBe('passed');
    expect(responseBody.data.length).toBe(5);
    expect(responseBody.data[0]).toHaveProperty('benutzername');
});  */

// Test 2: UI – Öffnen, Daten generieren und anzeigen
/*test('UI - Registrierung Testdaten generieren und überprüfen', async ({ page }) => {
    await page.goto(UI_URL);
    console.log("📌 Seite wurde geladen");
    await page.waitForTimeout(2000); // Warte 2 Sekunden

    //Titel überprüfen
    await expect(page).toHaveTitle("API");
    console.log("✅ Seitentitel geprüft");
    await page.waitForTimeout(2000);

    // 2️⃣ Klicke auf das Dropdown für "Datentyp wählen"
    const dropdown = page.getByRole('combobox', { name: /Datentyp wählen/i });
    await dropdown.click();
    console.log("📌 Dropdown geöffnet");
    await page.waitForTimeout(2000);

    // 3️⃣ Warte, bis die Option sichtbar ist, und klicke sie an
    const option = page.locator('text=registrierung').first();
    await option.waitFor(); // Warte, bis die Option gerendert wird
    await option.click();
    console.log("✅ 'Registrierung' ausgewählt");
    await page.waitForTimeout(2000);

    // 4️⃣ Überprüfe, ob das Dropdown nun die richtige Auswahl enthält
    await expect(dropdown).toHaveAttribute('aria-label', /Selected registrierung/i);
    console.log("✅ Dropdown-Wert überprüft");
    await page.waitForTimeout(2000);

    // Anzahl der Datensätze eingeben
    await page.fill('input[type="number"]', '5');
    console.log("📌 5 Datensätze eingegeben");
    await page.waitForTimeout(2000);

    // 4️⃣ Button "Daten generieren" klicken
    await page.getByRole('button', { name: /Daten generieren/i }).click();

    console.log("✅ Button 'Daten generieren' wurde geklickt");
    await page.waitForTimeout(3000);

    // Erfolgsnachricht überprüfen
    await expect(page.locator('text=5 Datensätze generiert!')).toBeVisible({ timeout: 10000 });

    console.log('🎉 Test erfolgreich – Bestätigung erhalten!');


    // 9️⃣ **Screenshot für Allure speichern**
    await allure.attachment('Screenshot', await page.screenshot(), 'image/png');


}); 


test('UI - Login Testdaten generieren und überprüfen', async ({ page }) => {
    await page.goto(UI_URL);
    console.log("📌 Seite wurde geladen");
    await page.waitForTimeout(2000); // Warte 2 Sekunden

    //Titel überprüfen
    await expect(page).toHaveTitle("API");
    console.log("✅ Seitentitel geprüft");
    await page.waitForTimeout(2000);

    // 2️⃣ Klicke auf das Dropdown für "Datentyp wählen"
    const dropdown = page.getByRole('combobox', { name: /Datentyp wählen/i });
    await dropdown.click();
    console.log("📌 Dropdown geöffnet");
    await page.waitForTimeout(2000);

    // 3️⃣ Warte, bis die Option sichtbar ist, und klicke sie an
    const option = page.locator('text=login').first();
    await option.waitFor(); // Warte, bis die Option gerendert wird
    await option.click();
    console.log("✅ 'login' ausgewählt");
    await page.waitForTimeout(2000);

    // 4️⃣ Überprüfe, ob das Dropdown nun die richtige Auswahl enthält
    await expect(dropdown).toHaveAttribute('aria-label', /Selected login/i);
    console.log("✅ Dropdown-Wert überprüft");
    await page.waitForTimeout(2000);

    // Anzahl der Datensätze eingeben
    await page.fill('input[type="number"]', '5');
    console.log("📌 5 Datensätze eingegeben");
    await page.waitForTimeout(2000);

    // 4️⃣ Button "Daten generieren" klicken
    await page.getByRole('button', { name: /Daten generieren/i }).click();

    console.log("✅ Button 'Daten generieren' wurde geklickt");
    await page.waitForTimeout(3000);

    // Erfolgsnachricht überprüfen
    await expect(page.locator('text=5 Datensätze generiert!')).toBeVisible({ timeout: 10000 });

    console.log('🎉 Test erfolgreich – Bestätigung erhalten!');


    // 9️⃣ **Screenshot für Allure speichern**
    await allure.attachment('Screenshot', await page.screenshot(), 'image/png');

});


test('UI - Profil Testdaten generieren und überprüfen', async ({ page }) => {
    await page.goto(UI_URL);
    console.log("📌 Seite wurde geladen");
    await page.waitForTimeout(2000); // Warte 2 Sekunden

    //Titel überprüfen
    await expect(page).toHaveTitle("API");
    console.log("✅ Seitentitel geprüft");
    await page.waitForTimeout(2000);

    // 2️⃣ Klicke auf das Dropdown für "Datentyp wählen"
    const dropdown = page.getByRole('combobox', { name: /Datentyp wählen/i });
    await dropdown.click();
    console.log("📌 Dropdown geöffnet");
    await page.waitForTimeout(2000);

    // 3️⃣ Warte, bis die Option sichtbar ist, und klicke sie an
    const option = page.locator('text=profil').first();
    await option.waitFor(); // Warte, bis die Option gerendert wird
    await option.click();
    console.log("✅ 'Profil' ausgewählt");
    await page.waitForTimeout(2000);

    // 4️⃣ Überprüfe, ob das Dropdown nun die richtige Auswahl enthält
    await expect(dropdown).toHaveAttribute('aria-label', /Selected profil/i);
    console.log("✅ Dropdown-Wert überprüft");
    await page.waitForTimeout(2000);

    // Anzahl der Datensätze eingeben
    await page.fill('input[type="number"]', '5');
    console.log("📌 5 Datensätze eingegeben");
    await page.waitForTimeout(2000);

    // 4️⃣ Button "Daten generieren" klicken
    await page.getByRole('button', { name: /Daten generieren/i }).click();

    console.log("✅ Button 'Daten generieren' wurde geklickt");
    await page.waitForTimeout(3000);

    // Erfolgsnachricht überprüfen
    await expect(page.locator('text=5 Datensätze generiert!')).toBeVisible({ timeout: 10000 });

    console.log('🎉 Test erfolgreich – Bestätigung erhalten!');


    // 9️⃣ **Screenshot für Allure speichern**
    await allure.attachment('Screenshot', await page.screenshot(), 'image/png');

});


test('UI - Bestellung Testdaten generieren und überprüfen', async ({ page }) => {
    await page.goto(UI_URL);
    console.log("📌 Seite wurde geladen");
    await page.waitForTimeout(2000); // Warte 2 Sekunden

    //Titel überprüfen
    await expect(page).toHaveTitle("API");
    console.log("✅ Seitentitel geprüft");
    await page.waitForTimeout(2000);

    // 2️⃣ Klicke auf das Dropdown für "Datentyp wählen"
    const dropdown = page.getByRole('combobox', { name: /Datentyp wählen/i });
    await dropdown.click();
    console.log("📌 Dropdown geöffnet");
    await page.waitForTimeout(2000);

    // 3️⃣ Warte, bis die Option sichtbar ist, und klicke sie an
    const option = page.locator('text=bestellung').first();
    await option.waitFor(); // Warte, bis die Option gerendert wird
    await option.click();
    console.log("✅ 'bestellung' ausgewählt");
    await page.waitForTimeout(2000);

    // 4️⃣ Überprüfe, ob das Dropdown nun die richtige Auswahl enthält
    await expect(dropdown).toHaveAttribute('aria-label', /Selected bestellung/i);
    console.log("✅ Dropdown-Wert überprüft");
    await page.waitForTimeout(2000);

    // Anzahl der Datensätze eingeben
    await page.fill('input[type="number"]', '5');
    console.log("📌 5 Datensätze eingegeben");
    await page.waitForTimeout(2000);

    // 4️⃣ Button "Daten generieren" klicken
    await page.getByRole('button', { name: /Daten generieren/i }).click();

    console.log("✅ Button 'Daten generieren' wurde geklickt");
    await page.waitForTimeout(3000);

    // Erfolgsnachricht überprüfen
    await expect(page.locator('text=5 Datensätze generiert!')).toBeVisible({ timeout: 10000 });

    console.log('🎉 Test erfolgreich – Bestätigung erhalten!');


    // 9️⃣ **Screenshot für Allure speichern**
    await allure.attachment('Screenshot', await page.screenshot(), 'image/png');

}); */

/*// Test 3: Exportfunktion – JSON, CSV, XLSX herunterladen
test('UI - Datenexport testen', async ({ page }) => {

    await page.goto(UI_URL);
    console.log("📌 Seite geladen");

    // Titel überprüfen
    await expect(page).toHaveTitle("API");
    console.log("✅ Seitentitel geprüft");

    // Datentyp auswählen (Bestellung)
    const dropdown = page.getByRole('combobox', { name: /Datentyp wählen/i });
    await dropdown.click();
    const option = page.locator('text=bestellung').first();
    //await option.waitFor();
    await option.click();
    await expect(dropdown).toHaveAttribute('aria-label', /Selected bestellung/i);
    console.log("✅ 'Bestellung' ausgewählt");
    await page.waitForTimeout(2000); // Warte 2 Sekunden

    // Datensätze eingeben und generieren
    await page.fill('input[type="number"]', '5');
    await page.getByRole('button', { name: /Daten generieren/i }).click();
    console.log("✅ 5 Datensätze generiert");
    await expect(page.locator('text=5 Datensätze generiert!')).toBeVisible({ timeout: 10000 });

    // Exportformat (JSON) auswählen
    const Exportformat = page.getByRole('combobox', { name: /Exportformat auswählen/i });
    await Exportformat.click();
    const optionJson = page.locator('text=json').first();
    //await optionJson.waitFor();
    await optionJson.click();
    await expect(Exportformat).toHaveAttribute('aria-label', /Selected json/i);
    console.log("✅ 'json' als Exportformat ausgewählt");
    await page.waitForTimeout(2000); // Warte 2 Sekunden

    // Daten exportieren
    await page.getByRole('button', { name: /Daten exportieren/i }).click();
    const [downloadJson] = await Promise.all([
        page.waitForEvent('download'),
        page.click('button:has-text("📥 Download JSON")')
    ]);
    expect(downloadJson.suggestedFilename()).toContain('data.json');
    console.log("✅ JSON-Daten exportiert");
    await page.waitForTimeout(2000); // Warte 2 Sekunden
    
    // Test CSV-Export
    await Exportformat.click();
    const optionCsv = page.locator('text=csv').first();
    //await optionCsv.waitFor();
    await optionCsv.click();
    await expect(Exportformat).toHaveAttribute('aria-label', /Selected csv/i);
    console.log("✅ 'csv' als Exportformat ausgewählt");
    await page.waitForTimeout(2000); // Warte 2 Sekunden

    await page.getByRole('button', { name: /Daten exportieren/i }).click();
    const [downloadCsv] = await Promise.all([
        page.waitForEvent('download'),
        page.click('button:has-text("📥 Download CSV")')
    ]);
    expect(downloadCsv.suggestedFilename()).toContain('data.csv');
    console.log("✅ CSV-Daten exportiert");
    await page.waitForTimeout(2000); // Warte 2 Sekunden

    // Test XLSX-Export
    await Exportformat.click();
    const optionXlsx = page.locator('text=xlsx').first();
    //await optionXlsx.waitFor();
    await optionXlsx.click();
    await expect(Exportformat).toHaveAttribute('aria-label', /Selected xlsx/i);
    console.log("✅ 'xlsx' als Exportformat ausgewählt");
    await page.waitForTimeout(2000); // Warte 2 Sekunden

    await page.getByRole('button', { name: /Daten exportieren/i }).click();
    const [downloadXlsx] = await Promise.all([
        page.waitForEvent('download'),
        page.click('button:has-text("📥 Download XLSX")')
    ]);
    expect(downloadXlsx.suggestedFilename()).toContain('data.xlsx');
    console.log("✅ XLSX-Daten exportiert");
    await page.waitForTimeout(2000); // Warte 2 Sekunden

    // Test XML-Export
    await Exportformat.click();
    const optionXml = page.locator('text=xml').first();
    //await optionXlsx.waitFor();
    await optionXml.click();
    await expect(Exportformat).toHaveAttribute('aria-label', /Selected xml/i);
    console.log("✅ 'xml' als Exportformat ausgewählt");
    await page.waitForTimeout(2000); // Warte 2 Sekunden

    await page.getByRole('button', { name: /Daten exportieren/i }).click();
    const [downloadXml] = await Promise.all([
        page.waitForEvent('download'),
        page.click('button:has-text("📥 Download XML")')
    ]);
    expect(downloadXml.suggestedFilename()).toContain('data.xml');
    console.log("✅ XML-Daten exportiert");
    await page.waitForTimeout(2000); // Warte 2 Sekunden



    // Test TXT-Export
    await Exportformat.click();
    const optionTxt = page.locator('text=txt').first();
    //await optionXlsx.waitFor();
    await optionTxt.click();
    await expect(Exportformat).toHaveAttribute('aria-label', /Selected txt/i);
    console.log("✅ 'txt' als Exportformat ausgewählt");
    await page.waitForTimeout(2000); // Warte 2 Sekunden

    await page.getByRole('button', { name: /Daten exportieren/i }).click();
    const [downloadTxt] = await Promise.all([
        page.waitForEvent('download'),
        page.click('button:has-text("📥 Download TXT")')
    ]);
    expect(downloadTxt.suggestedFilename()).toContain('data.txt');
    console.log("✅ TXT-Daten exportiert");
    await page.waitForTimeout(2000); // Warte 2 Sekunden

    // Screenshot für Allure speichern
    await allure.attachment('Screenshot', await page.screenshot(), 'image/png');
}); */




/*test('UI - Datenexport testen (POM)', async ({ page }) => {
    const exportPage = new ExportPage(page);
    const UI_URL = 'http://localhost:8501'; // Setze die URL deiner Anwendung ein

    await exportPage.goto(UI_URL);
    await exportPage.verifyTitle("API");

    await exportPage.selectDataType('bestellung');
    await exportPage.enterDataCount(5);
    await exportPage.generateData();

    // Export in verschiedenen Formaten testen
    const exportFormats = [
        { format: 'json', extension: 'json' },
        { format: 'csv', extension: 'csv' },
        { format: 'xlsx', extension: 'xlsx' },
        { format: 'xml', extension: 'xml' },
        { format: 'txt', extension: 'txt' }
    ];

    for (const { format, extension } of exportFormats) {
        await exportPage.exportData(format, extension);
    }

    // Screenshot für Allure speichern
    await allure.attachment('Screenshot', await page.screenshot(), 'image/png');
}); */





/*import { test, expect } from '@playwright/test';
import { promises as fs } from 'fs';
import path from 'path';

test('Daten für CoffeeShop-Webseite verwenden', async ({ page }) => {
    const COFFEESHOP_URL = 'http://10.40.226.38/Bootcamp_Bench/index.php';

    // Lade Testdaten aus der Datei
    const testDataPath = path.resolve(__dirname, '../test-data/coffeeshop_testdata.json');
    const rawData = await fs.readFile(testDataPath, 'utf-8');
    const testData = JSON.parse(rawData);

     // 🚨 Prüfen, ob Registrierungsdaten vorhanden sind
     if (!testData.registrierung || testData.registrierung.length === 0) {
        throw new Error("🚨 Fehler: Keine Registrierungsdaten in der JSON-Datei gefunden!");
    }

    let validUser = null;
    //let username = ''; // Declare username variable as let to allow reassignment

    // 🔄 Wiederhole, bis gültige Testdaten gefunden werden
    while (testData.registrierung.length > 0) {
        // 🎲 Zufällige Daten für Registrierung auswählen
        const randomIndex = Math.floor(Math.random() * testData.registrierung.length);
        const randomUser = testData.registrierung[randomIndex];

        // 🌟 Sicherstellen, dass Benutzername und Passwort vorhanden sind
        if (!randomUser.benutzername || !randomUser.passwort) {
            testData.registrierung.splice(randomIndex, 1); // Entferne ungültige Daten
            continue;
        }


    // 🛑 Fehlerprüfung für fehlende Felder
    if (!randomUser.benutzername || !randomUser.passwort ) {
        throw new Error("🚨 Fehler: Ungültige Registrierungsdaten in der JSON-Datei!");
    }

    // 🌟 Sicherstellen, dass die Passwörter gleich sind
    const username = randomUser.benutzername;
    const password = randomUser.passwort.trim();
    const passwordRepeat = password; // Passwort-Wiederholung


    console.log("🔹 Verwendete Testdaten:");
    console.log(`👤 Benutzername: ${username}`);
    console.log(`🔑 Passwort: ${password}`);
    console.log(`🔑 Passwort_wiederholen: ${passwordRepeat}`);


    // 📌 CoffeeShop-Seite öffnen
    await page.goto(COFFEESHOP_URL);
    //await page.waitForTimeout(2000); // Warte 2 Sekunden
    console.log("📌 CoffeeShop-Webseite geladen");
    

    // 1️⃣ Prüfen, ob das Logo existiert
    const logo = await page.$('#headlogo');
    expect(logo).not.toBeNull();
    //await page.waitForTimeout(2000); // Warte 2 Sekunden
    console.log("✅ Logo ist vorhanden");
    

    // 3️⃣ Auf Account-Button klicken
    await page.click('#accountbar > a');
    console.log("✅ Auf Accountbar geklickt");
    await page.waitForTimeout(2000); // Warte 2 Sekunden

    // 4️⃣ Prüfen, ob die Login-Überschrift existiert
    await expect(page.locator('#loginContainer > h2')).toBeVisible();
    await page.waitForTimeout(2000); // Warte 2 Sekunden
    console.log("✅ Login-Container Überschrift gefunden");
    //await page.waitForTimeout(2000); // Warte 2 Sekunden

    // 5️⃣ Auf den Registrierungs-Link klicken
    await page.click('#loginContainer > div > a');
    console.log("✅ Auf Registrierung geklickt");
    //await page.waitForTimeout(2000); // Warte 2 Sekunden

    // 🕵️ Sicherstellen, dass das Passwort-Feld sichtbar ist
    await page.waitForSelector('#register-pwrep', { state: 'visible', timeout: 5000 });

    // 6️⃣ Registrierungsfelder ausfüllen
    await page.type('#register-username', username, { delay: 200 }); // Benutzername langsam eingeben
    await page.type('#register-pw', password, { delay: 200 }); // Passwort langsam eingeben
    await page.type('#register-pwrep', passwordRepeat, { delay: 200 }); // Passwort-Wiederholung langsam eingeben
    console.log("✅ Registrierungsformular ausgefüllt");
    //await page.waitForTimeout(2000); // Warte 2 Sekunden


    // ⛔ Prüfen, ob Fehlermeldungen für Benutzername oder Passwort erscheinen
    const userError = await page.locator('#usrmsg').textContent();
    const passwordError = await page.locator('#pwmsg').textContent();

    if (userError?.trim() || passwordError?.trim()) {
        console.log(`⚠️ Ungültige Daten: ${userError || ''} ${passwordError || ''}`);
        testData.registrierung.splice(randomIndex, 1); // Entferne ungültige Daten
        continue; // Nächsten Testdatensatz wählen
    }

    //validUser = randomUser;
    //username = randomUser.benutzername; // Assign username value
    validUser = randomUser;
    break;
}

// Falls keine gültigen Daten gefunden wurden
if (!validUser) {
    throw new Error("❌ Keine gültigen Testdaten gefunden.");
}

    // 🛑 Prüfen, ob Fehlermeldung für Passwortwiederholung angezeigt wird
    const repwmsg = await page.locator('#repwmsg');

   // Warten, bis die Fehlermeldung verschwindet
    await expect(repwmsg).toBeHidden({ timeout: 5000 });
    console.log("✅ Fehlermeldung ist nicht mehr sichtbar. Test wird fortgesetzt.");

    // Debugging: Überprüfen Sie den Zustand des Elements
    const isVisible = await repwmsg.isVisible();
    const textContent = await repwmsg.textContent();
    console.log(`🔍 Fehlermeldung sichtbar: ${isVisible}`);
    console.log(`🔍 Fehlermeldung Text: ${textContent}`);

    if (isVisible && textContent && textContent.trim().length > 0) {
        console.log(`❌ Fehler: ${textContent}`);
        throw new Error("⚠️ Die Passwörter stimmen nicht überein");
    } else {
    console.log("✅ Keine Fehlermeldung für Passwortwiederholung gefunden. Test wird fortgesetzt.");
    }

    // 7️⃣ AGB-Checkbox auswählen
    await page.check('#register-check');
    console.log("✅ AGB akzeptiert");
    await page.waitForTimeout(2000); // Warte 2 Sekunden

    // 8️⃣ Registrierung absenden
    await page.click('body > content > div:nth-child(2) > div > form > div.reg.btn > input');
    console.log("✅ Registrierung abgeschickt");
    await page.waitForTimeout(2000); // Warte 2 Sekunden

    // 🛑 Prüfen, ob die Erfolgsmeldung nach der Registrierung angezeigt wird
    const successMessage = page.locator('#overlaysubmit > h2');

    if (await successMessage.isVisible()) {
        const messageText = await successMessage.textContent();
        console.log(`✅ Erfolgsmeldung gefunden: ${messageText}`);

        // ✅ Bestätigungsbutton anklicken
        await page.click('#overlaysubmit > button');
        console.log("✅ Bestätigungsbutton geklickt");
    } else {
    console.log("⚠️ Erfolgsmeldung nach der Registrierung nicht gefunden!");
    }


    // 🚨 Entfernte Testdaten aus der Datei speichern, um doppelte Nutzung zu vermeiden
    await fs.writeFile(testDataPath, JSON.stringify(testData, null, 2), 'utf-8');
    console.log("✅ Testdaten aktualisiert (bereits verwendete entfernt).");


    // 9️⃣ Zur Startseite zurückkehren
    await page.goto(COFFEESHOP_URL);
    await page.waitForTimeout(2000); // Warte 2 Sekunden
    console.log("📌 Zurück zur Hauptseite");
    

    // 🔟 Erneut auf Login klicken
    await page.click('#accountbar > a');
    console.log("✅ Auf Login geklickt");
    await page.waitForTimeout(2000); // Warte 2 Sekunden

    // 1️⃣1️⃣ Login-Felder ausfüllen
    await page.type('#login-username', username, { delay: 200 });
    await page.type('#login-password', password, { delay: 200 });
    console.log("✅ Login-Formular ausgefüllt");
    await page.waitForTimeout(2000); // Warte 2 Sekunden

    // 1️⃣2️⃣ Login absenden
    await page.click('#login-submit');
    console.log("✅ Login abgeschickt");
    await page.waitForTimeout(2000); // Warte 2 Sekunden

    // 1️⃣3️⃣ Überprüfen, ob der Login erfolgreich war (z.B. prüfen, ob ein Logout-Button existiert)
    await expect(page.locator('#logout-button')).toBeVisible();
    console.log("🎉 Erfolgreich eingeloggt!");
    await page.waitForTimeout(2000); // Warte 2 Sekunden

    // 5️⃣ Prüfen, ob body > content > div:nth-child(2) > div > h2 existiert
    //await expect(page.locator('body > content > div:nth-child(2) > div > h2')).toBeVisible();
    //console.log("✅ Login-Formular Überschrift gefunden");
    //await page.waitForTimeout(2000); // Warte 2 Sekunden
}); */


/*import { test, expect } from '@playwright/test';
import { log } from 'console';
import { promises as fs } from 'fs';
import path from 'path';
import axios from 'axios'; // Fügen Sie Axios hinzu, um mit der API zu kommunizieren

test('Ungültige Daten für CoffeeShop-Webseite verwenden', async ({ page }) => {
    const COFFEESHOP_URL = 'http://10.40.226.38/Bootcamp_Bench/index.php';

    // API URL
    const API_URL = 'http://127.0.0.1:8001/generate/registrierung/1'; // Beispiel für 1 Datensatz, der ungültige Daten enthält
    let testData = null;

    try {
        // Lade Testdaten von der API
        const response = await axios.get(API_URL);
        testData = response.data;
        console.log('Testdaten erfolgreich abgerufen:', testData);
    } catch (error) {
        throw new Error('Fehler beim Abrufen der Testdaten von der API: ' + error.message);
    }

    // Prüfen, ob ungültige Registrierungsdaten in der API-Antwort vorhanden sind
    if (
        !testData.ungültige_daten ||
        !Array.isArray(testData.ungültige_daten) ||
        testData.ungültige_daten.length === 0
    ) {
        throw new Error("🚨 Fehler: Keine ungültigen Registrierungsdaten in der API-Antwort gefunden!");
    }

    let invalidUser = null;
    const invalidUsers = testData.ungültige_daten;

    // Wir gehen davon aus, dass alle ungültigen Daten benutzt werden können.
    // Wählen Sie zufällig eine ungültige Testdatenreihe
    const randomIndex = Math.floor(Math.random() * invalidUsers.length);
    invalidUser = invalidUsers[randomIndex];

    const username = invalidUser.benutzername;
    const password = invalidUser.passwort.trim();
    const passwordRepeat = password; // Passwort-Wiederholung

    console.log("🔹 Verwendete ungültige Testdaten:");
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

    // Prüfen, ob die eingegebenen Daten ungültig sind (z.B. Benutzername oder Passwort zu kurz oder ungültig)
    const usernameMessage = await page.locator('#usrmsg').textContent();
    const userError = await page.locator('#repwmsg').textContent();
    const passwordError = await page.locator('#pwmsg').textContent();

    // Wenn eine Fehlermeldung angezeigt wird, bestätigen, dass ungültige Daten erkannt wurden
    if (
        usernameMessage || userError || passwordError
    ) {
        console.log("⚠️ Ungültige Daten wurden erkannt, die Registrierung sollte fehlschlagen.");
        // Test als bestanden markieren
        expect(usernameMessage || userError || passwordError).toBeTruthy(); // Bestätigung, dass eine Fehlermeldung vorliegt
    } else {
        console.log("✅ Registrierung sollte fehlschlagen, aber keine Fehlermeldung aufgetreten.");
        throw new Error("❌ Fehler: Keine Fehlermeldung bei ungültigen Daten erkannt.");
    }

    // Test als bestanden markieren
    console.log("✅ Fehler bei der Registrierung mit ungültigen Daten erwartet - Test bestanden!");
}); */

