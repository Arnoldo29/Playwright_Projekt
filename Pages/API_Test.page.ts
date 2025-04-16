import { Page, expect } from '@playwright/test';

export class ExportPage {
    readonly page: Page;
    readonly dropdown;
    readonly exportFormat;
    readonly generateButton;
    readonly exportButton;

    constructor(page: Page) {
        this.page = page;
        this.dropdown = page.getByRole('combobox', { name: /Datentyp wählen/i });
        this.exportFormat = page.getByRole('combobox', { name: /Exportformat auswählen/i });
        this.generateButton = page.getByRole('button', { name: /Daten generieren/i });
        this.exportButton = page.getByRole('button', { name: /Daten exportieren/i });
    }

    async goto(url: string) {
        await this.page.goto(url);
        console.log("📌 Seite geladen");
        await this.page.waitForTimeout(2000);
    }

    async verifyTitle(expectedTitle: string) {
        await expect(this.page).toHaveTitle(expectedTitle);
        console.log(`✅ Seitentitel geprüft: ${expectedTitle}`);
        await this.page.waitForTimeout(2000);
    }

    async selectDataType(dataType: string) {
        await this.dropdown.click();
        await this.page.locator(`text=${dataType}`).first().click();
        await expect(this.dropdown).toHaveAttribute('aria-label', new RegExp(`Selected ${dataType}`, 'i'));
        console.log(`✅ '${dataType}' als Datentyp ausgewählt`);
        await this.page.waitForTimeout(2000);
    }

    async enterDataCount(count: number) {
        await this.page.fill('input[type="number"]', count.toString());
        console.log(`📌 ${count} Datensätze eingegeben`);
        await this.page.waitForTimeout(2000);
    }

    async generateData(count: number) {
        // Dynamischer Text, der die Anzahl der generierten Datensätze enthält
        const confirmationText = `${count} gültige Datensätze generiert!`;
    
        // Warten auf den Button zum Generieren der Daten und sicherstellen, dass er sichtbar ist
        const generateButtonLocator = this.page.locator('#root > div:nth-child(1) > div.withScreencast > div > div > section > div.stMainBlockContainer.block-container.st-emotion-cache-mtjnbi.eht7o1d4 > div > div > div > div:nth-child(4) > div > button > div');
        await expect(generateButtonLocator).toBeVisible({ timeout: 5000 });
    
        // Klick auf den Button, um die Daten zu generieren
        await generateButtonLocator.click();
    
        // Bestätigungsnachricht erwarten
        const confirmationLocator = this.page.locator(`#root > div:nth-child(1) > div.withScreencast > div > div > section > div.stMainBlockContainer.block-container.st-emotion-cache-mtjnbi.eht7o1d4 > div > div > div > div:nth-child(5) > div > div > div > div > div > div:has-text("${confirmationText}")`);
        await expect(confirmationLocator).toBeVisible({ timeout: 10000 });
    
        // Konsolen-Log zur Bestätigung der Generierung
        console.log(`✅ ${confirmationText} erfolgreich generiert`);
    
        // Optional: Warte etwas, um sicherzustellen, dass die Bestätigung vollständig sichtbar ist
        await this.page.waitForTimeout(2000);
    }
    
    

    async exportiereUndLadeFormate(formate: string[]) {
        for (const format of formate) {
            console.log(`📌 Beginne mit dem Export für das Format '${format}'`);
    
            // 1. Dropdown öffnen
            const comboBox = this.page.getByRole('combobox', { name: /Exportformat/i });
            await comboBox.click();
            await expect(comboBox).toBeVisible({ timeout: 5000 }); // Sicherstellen, dass das Dropdown sichtbar ist
            await this.page.waitForTimeout(500); // Kleine Pause, falls Animation
    
            // 2. Option im Dropdown suchen und klicken
            const option = this.page.locator(`div:has-text("${format}")`).first();
            await option.scrollIntoViewIfNeeded(); // Scrollen, falls die Option nicht sichtbar ist
            await expect(option, `Option '${format}' sollte sichtbar sein`).toBeVisible({ timeout: 10000 });
            await option.click();
            console.log(`✅ Format '${format}' ausgewählt`);
    
            // 3. Exportieren-Button suchen und klicken
            const exportButton = this.page.getByRole('button', { name: /Daten exportieren/i });
            await expect(exportButton, 'Exportieren-Button sollte sichtbar sein').toBeVisible({ timeout: 5000 });
            await exportButton.click();
            console.log(`⬇️ Exportvorgang für '${format}' gestartet`);
    
            // 4. Auf den passenden Download-Button warten und klicken
            const downloadButton = this.page.getByRole('button', {
                name: new RegExp(`Download ${format}\\s*\\(gültig\\)`, 'i'),
            });
    
            const [download] = await Promise.all([
                this.page.waitForEvent('download'),
                downloadButton.click(),
            ]);
    
            // 5. Datei speichern
            const filename = await download.suggestedFilename();
            await download.saveAs(`downloads/${filename}`);
            console.log(`✅ Datei im Format '${format}' erfolgreich heruntergeladen: ${filename}`);
        }
    }
    
    

   /* async exportiereUndLadeFormate(formate: string[]) {
        for (const format of formate) {
            // Export-Dropdown öffnen
            const exportDropdown = this.page.locator('[role="combobox"][aria-label*="Exportformat"]');
            await expect(exportDropdown, 'Export-Dropdown sollte sichtbar sein').toBeVisible({ timeout: 10000 });
            await exportDropdown.click();
            console.log(`📂 Dropdown für Exportformate geöffnet`);
    
            // Option aus Dropdown wählen (Format auswählen)
            const option = this.page.locator(`div.st-bn:has-text('${format}')`).first(); // Sucht nach der Format-Option
            await expect(option, `Option '${format}' sollte sichtbar sein`).toBeVisible({ timeout: 5000 });
            await option.click();
            console.log(`📌 Format '${format}' ausgewählt`);
    
            // Exportieren-Button klicken
            const exportButton = this.page.locator('button:has-text("💾 Exportieren")');
            await expect(exportButton, 'Exportieren-Button sollte sichtbar sein').toBeVisible({ timeout: 5000 });
            await exportButton.click();
            console.log(`⬇️ Exportvorgang für '${format}' gestartet`);
    
            // Download-Button abhängig vom Format suchen
            const downloadButton = this.page.getByRole('button', {
                name: new RegExp(`Download ${format.toUpperCase()} \\(gültig\\)`, 'i'),
            });

            const [download] = await Promise.all([
                this.page.waitForEvent('download'),
                downloadButton.first().click(),
            ]);
    
            // Datei speichern
            const filename = await download.suggestedFilename();
            await download.saveAs(`downloads/${filename}`);
            console.log(`✅ Datei im Format '${format}' heruntergeladen: ${filename}`);
        }
    } */
    
    
    
    
}
