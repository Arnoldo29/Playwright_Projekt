/*test('API - Testdaten generieren', async ({ request }) => {
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




/*// Test 4: Login – Benutzeranmeldung
test('UI - Benutzeranmeldung', async ({ page }) => {
    await page.goto(UI_URL);

    // Gehe zur Login-Seite
    await page.click('text=Login');

    // Fülle das Login-Formular aus
    await page.fill('input[name="username"]', 'testuser');
    await page.fill('input[name="password"]', 'testpassword');

    // Klicke auf den Login-Button
    await page.click('button:has-text("Login")');

    // Überprüfe, ob der Benutzer erfolgreich angemeldet ist
    await expect(page.locator('text=Willkommen, testuser')).toBeVisible();
});

// Test 5: Profil – Benutzerprofil anzeigen und bearbeiten
test('UI - Benutzerprofil anzeigen und bearbeiten', async ({ page }) => {
    await page.goto(UI_URL);

    // Gehe zur Login-Seite und melde dich an
    await page.click('text=Login');
    await page.fill('input[name="username"]', 'testuser');
    await page.fill('input[name="password"]', 'testpassword');
    await page.click('button:has-text("Login")');

    // Gehe zur Profil-Seite
    await page.click('text=Profil');

    // Überprüfe, ob das Profil angezeigt wird
    await expect(page.locator('text=Benutzerprofil')).toBeVisible();

    // Bearbeite das Profil
    await page.fill('input[name="email"]', 'newemail@example.com');
    await page.click('button:has-text("Speichern")');

    // Überprüfe, ob die Änderungen gespeichert wurden
    await expect(page.locator('text=Profil erfolgreich aktualisiert')).toBeVisible();
});

// Test 6: Bestellung – Produkt bestellen
test('UI - Produkt bestellen', async ({ page }) => {
    await page.goto(UI_URL);

    // Gehe zur Login-Seite und melde dich an
    await page.click('text=Login');
    await page.fill('input[name="username"]', 'testuser');
    await page.fill('input[name="password"]', 'testpassword');
    await page.click('button:has-text("Login")');

    // Gehe zur Produktseite
    await page.click('text=Produkte');

    // Wähle ein Produkt aus und füge es zum Warenkorb hinzu
    await page.click('text=Produkt 1');
    await page.click('button:has-text("In den Warenkorb")');

    // Gehe zum Warenkorb und zur Kasse
    await page.click('text=Warenkorb');
    await page.click('button:has-text("Zur Kasse")');

    // Fülle die Bestellinformationen aus
    await page.fill('input[name="address"]', 'Musterstraße 1');
    await page.fill('input[name="city"]', 'Musterstadt');
    await page.fill('input[name="postalCode"]', '12345');
    await page.fill('input[name="country"]', 'Deutschland');

    // Klicke auf den Bestell-Button
    await page.click('button:has-text("Bestellen")');

    // Überprüfe, ob die Bestellung erfolgreich abgeschlossen wurde
    await expect(page.locator('text=Bestellung erfolgreich')).toBeVisible();
}); */



 /*// 1️⃣ Locator für die Tabelle definieren
const table = page.locator('table[role="grid"]');

// 2️⃣ Warte darauf, dass die Tabelle im DOM existiert
await page.waitForSelector('table[role="grid"]', { state: 'attached', timeout: 20000 });

// 3️⃣ Display- und Visibility-Werte auslesen
const tableDisplay = await table.evaluate(el => getComputedStyle(el).display);
const tableVisibility = await table.evaluate(el => getComputedStyle(el).visibility);
console.log(`🎭 Display: ${tableDisplay}, Visibility: ${tableVisibility}`);

// 4️⃣ Falls `display: none`, mache sie sichtbar
if (tableDisplay === "none") {
    console.warn("🚨 Die Tabelle ist unsichtbar (display: none). Mache sie sichtbar...");
    await table.evaluate(el => el.style.display = 'block');
}

// 5️⃣ Falls `visibility: hidden`, mache sie sichtbar
if (tableVisibility === "hidden") {
    console.warn("👀 Die Tabelle ist versteckt (visibility: hidden). Mache sie sichtbar...");
    await table.evaluate(el => el.style.visibility = 'visible');
}

// 6️⃣ Falls Lazy-Loading aktiv ist, scrolle nach unten
console.log("📜 Scrolle nach unten, um Lazy-Loading auszulösen...");
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(1000);

// 7️⃣ Warte darauf, dass die Tabelle geladen und sichtbar wird
console.log("⏳ Warte auf das Laden der Tabelle...");
await page.waitForSelector('table[role="grid"]', { state: 'visible', timeout: 20000 });

// 8️⃣ Sichtbarkeits-Check erzwingen
await expect(table).toBeVisible({ timeout: 10000 });

console.log("🎉 Tabelle erfolgreich erkannt und sichtbar!"); */
