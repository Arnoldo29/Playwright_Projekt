export class DataAPI {
    private request: any;
    private baseUrl: string;

    constructor(request: any, baseUrl: string) {
        this.request = request;
        this.baseUrl = baseUrl;
    }

    async generateData(dataType: string, numRecords: number) {
        const endpoint = `generate/${dataType}/${numRecords}`;
        console.log(`📡 API-Request an: ${this.baseUrl}/${endpoint}`);

        const response = await this.request.get(`${this.baseUrl}/${endpoint}`, { timeout: 30000 });
        const responseBody = await response.text(); // Debugging

        console.log(`🔄 Statuscode: ${response.status()}`);
        console.log(`📩 Antwort: ${responseBody}`);

        if (!response.ok()) {
            throw new Error(`Fehler beim Generieren: ${endpoint}`);
        }
        return JSON.parse(responseBody);
    }

    async exportData(format: string) {
        const url = `${this.baseUrl}/export_data/${format}`;
        console.log(`📡 Export-Request an: ${url}`);
    
        let attempt = 0;
        const maxRetries = 3;
    
        while (attempt < maxRetries) {
            try {
                const response = await this.request.get(url, { timeout: 60000 });
                const responseBody = await response.text();
    
                if (!response.ok()) {
                    throw new Error(`Fehler beim Export als ${format}: ${response.status()} - ${responseBody}`);
                }
    
                return responseBody;  // Erfolgreiche Antwort zurückgeben
            } catch (error) {
                console.error(`❌ Fehler beim Exportieren von Daten als ${format} (Versuch ${attempt + 1}):`, error.message);
                if (error.message.includes("ECONNRESET")) {
                    console.log("Verbindung zurückgesetzt. Versuche es erneut...");
                    attempt++;
                    if (attempt >= maxRetries) {
                        console.error("Maximale Anzahl von Versuchen erreicht. Export fehlgeschlagen.");
                        throw error;  // Gebe den Fehler weiter, wenn die maximalen Versuche erreicht wurden
                    }
                } else {
                    throw error;  // Bei anderen Fehlern den Fehler sofort weiterwerfen
                }
            }
        }
    }
    
}
