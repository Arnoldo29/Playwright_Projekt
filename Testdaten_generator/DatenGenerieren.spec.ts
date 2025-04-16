import { test } from '@playwright/test';
import { ExportPage } from '../Pages/API_Test.page';
import { DataExporter } from '../utils/DataExporter';

test('Daten für CoffeeShop generieren und exportieren', async ({ page }) => {
    const exportPage = new ExportPage(page);
    const UI_URL = 'http://localhost:8501'; // Setze deine URL hier ein

    await exportPage.goto(UI_URL);
    await exportPage.verifyTitle("API_Neu");

    // Funktionen für Registrierung, Login und Profil testen
    const functions = ['registrierung', 'login', 'profil'];
    const generatedData: Record<string, string> = {};

    for (const func of functions) {
        await exportPage.selectDataType(func);
        await exportPage.enterDataCount(5);
        await exportPage.generateData(5);

        // Daten in JSON speichern
        generatedData[func] = `Daten für ${func} generiert`;
    }

    // Speichern der generierten Daten für die CoffeeShop-Seite
    await DataExporter.saveData('coffeeshop_testdata', generatedData);

    // Export in verschiedene Formate testen
    const exportFormats = ['json', 'csv', 'xlsx', 'xml'];


    await exportPage.exportiereUndLadeFormate(exportFormats);

    console.log("🎉 Alle Daten erfolgreich generiert und exportiert!");
});
