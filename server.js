const express = require('express');
const { chromium } = require('playwright');
const app = express();
const port = 8501;

app.use(express.json());

app.post('/api/run-test', async (req, res) => {
    const BASE_URL = 'http://localhost:8000';
    const testName = 'API - Testdaten generieren';

    try {
        console.log('Starte den Test:', testName);

        const browser = await chromium.launch();
        const page = await browser.newPage();

        console.log('Sende GET-Anfrage an:', `${BASE_URL}/generate/registrierung/5`);
        const response = await page.request.get(`${BASE_URL}/generate/registrierung/5`);
        console.log('Antwortstatus:', response.status());

        if (response.status() !== 200) {
            await browser.close();
            return res.status(500).json({ error: 'Fehler beim Abrufen der Testdaten' });
        }

        const jsonData = await response.json();
        console.log('Antwortdaten:', jsonData);

        console.log('Überprüfe die Anzahl der generierten Datensätze');
        if (jsonData.length !== 5) {
            await browser.close();
            return res.status(500).json({ error: 'Falsche Anzahl der generierten Datensätze' });
        }

        console.log('Überprüfe, ob der erste Datensatz das Attribut "benutzername" enthält');
        if (!jsonData[0].hasOwnProperty('benutzername')) {
            await browser.close();
            return res.status(500).json({ error: 'Erster Datensatz enthält nicht das Attribut "benutzername"' });
        }

        console.log('Test erfolgreich abgeschlossen');
        await browser.close();
        res.json({ status: 'passed', data: jsonData });
    } catch (error) {
        console.error('Fehler beim Ausführen des Tests:', error);
        res.status(500).json({ error: 'Fehler beim Ausführen des Tests' });
    }
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});