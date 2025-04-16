import { promises as fs } from 'fs';
import path from 'path';

export class DataExporter {
    static async saveData(filename: string, data: object) {
        const dir = path.resolve('./test-data');
        await fs.mkdir(dir, { recursive: true }); // Ordner erstellen, falls er nicht existiert
        await fs.writeFile(path.join(dir, `${filename}.json`), JSON.stringify(data, null, 2));
        console.log(`✅ Daten gespeichert: ${filename}.json`);
    }

    static async loadData(filename: string): Promise<any> {
        const dir = path.resolve('./test-data');
        const data = await fs.readFile(path.join(dir, `${filename}.json`), 'utf8');
        return JSON.parse(data);
    }
}