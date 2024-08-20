const fs = require('fs');

// Pfad zum Ordner mit den Textdateien
const filepath_in = process.env.filepath_in ;
const filepath_out = process.env.filepath_out ;

// Funktion zum Ersetzen von Umlauten durch HTML-Escape-Sequenzen
function replaceUmlauts(text) {
    return text
        .replace(/ä/g, '&auml;')
        .replace(/ö/g, '&ouml;')
        .replace(/ü/g, '&uuml;')
        .replace(/Ä/g, '&Auml;')
        .replace(/Ö/g, '&Ouml;')
        .replace(/Ü/g, '&Uuml;')
        .replace(/ß/g, '&szlig;');
}

// Funktion zum Einlesen der Dateien und Ersetzen der Umlaute
function processFiles() {
    fs.readFile(filepath_in, 'utf8', (err, data) => {
        if (err) {
            return console.log(`Fehler beim Lesen der Datei ${file}:`, err);
        }
        
        // Umlaute ersetzen
        const updatedData = replaceUmlauts(data);
        
        // Datei mit ersetzten Umlauten speichern
        fs.writeFile(filepath_out, updatedData, 'utf8', (err) => {
            if (err) {
                return console.log(`Fehler beim Schreiben der Datei ${file}:`, err);
            }
            console.log(`Datei ${file} wurde erfolgreich aktualisiert.`);
        });
    });
}

// Funktion aufrufen
processFiles();