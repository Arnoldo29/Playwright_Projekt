# Verwende ein offizielles Python-Image
FROM python:3.9

# Setze das Arbeitsverzeichnis
WORKDIR /app

# Kopiere den gesamten Code in das Image
COPY . .

# Installiere die Abhängigkeiten
RUN pip install --no-cache-dir -r requirements.txt

# Exponiere den Port, auf dem der API-Server läuft
EXPOSE 8001

# Starte den API-Server
CMD ["python", "API_Neu.py"]