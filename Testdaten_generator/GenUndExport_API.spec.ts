import { test } from '@playwright/test';
import { DataAPI } from '../utils/DataApi';
import { promises as fs } from 'fs';
import path from 'path';

test('Daten generieren und exportieren (API)', async ({ request }) => {
    const API_URL = process.env.UI_URL || 'http://localhost:8001'; // Korrigierte Basis-URL
    const api = new DataAPI(request, API_URL);

    // Daten für Registrierung, Login und Profil generieren
    const testData = {
        registrierung: await api.generateData('registrierung', 5),
        login: await api.generateData('login', 5),
        profil: await api.generateData('profil', 5)
    };

   // Speichere die Daten als JSON im Hauptverzeichnis "Playwright-Kurs"
   const baseDir = path.resolve(__dirname, '..'); // Gehe ein Verzeichnis nach oben
   const absolutePath = path.resolve(baseDir, 'test-data', 'coffeeshop_testdata.json');
   const dir = path.dirname(absolutePath);

   // Erstellen Sie den Ordner, falls er nicht existiert
   await fs.mkdir(dir, { recursive: true });

   await fs.writeFile(absolutePath, JSON.stringify(testData, null, 2));
   console.log("✅ Testdaten gespeichert!");

   // Export in verschiedene Formate
   const formats = 'json';
   for (const format of formats) {
       try {
           const fileData = await api.exportData(format);
           const exportFilePath = path.resolve(baseDir, 'test-data', `data.${format}`);
           
           // Speichere die exportierten Daten als Datei
           await fs.writeFile(exportFilePath, fileData);
           console.log(`✅ Daten als ${format} exportiert!`);
       } catch (error) {
           console.error(`❌ Fehler beim Exportieren von Daten als ${format}:`, error.message);
       }
    }
});
