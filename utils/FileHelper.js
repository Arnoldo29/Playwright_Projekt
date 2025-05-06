const fs = require('fs').promises;
const path = require('path');

class FileHelper {
  // Funktion zum Schreiben von JSON-Daten in eine Datei
  static async writeJsonFile(filePath, data) {
    try {
      const dir = path.dirname(filePath);
      await fs.mkdir(dir, { recursive: true }); // Ordner erstellen, falls nicht vorhanden
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));
      console.log(`✅ Datei erfolgreich gespeichert: ${filePath}`);
    } catch (error) {
      console.error(`❌ Fehler beim Speichern der Datei: ${error.message}`);
    }
  }

  // Funktion zum Lesen von JSON-Daten aus einer Datei
  static async readJsonFile(filePath) {
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`❌ Fehler beim Lesen der Datei: ${error.message}`);
      throw error;
    }
  }

  // Funktion zum Überprüfen, ob eine Datei existiert
  static async fileExists(filePath) {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }
}

module.exports = FileHelper;