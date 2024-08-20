const fs = require('fs');

// Pfad zum Ordner mit den Textdateien
const filepath_in = process.env.filepath_in ;
const filepath_out = process.env.filepath_out ;

// Funktion zum Ersetzen von HTML-Escape-Sequenzen durch Umlaute
function replaceHtmlEntities(text) {
    return text
        .replace(/&auml;/g, 'ä')
        .replace(/&ouml;/g, 'ö')
        .replace(/&uuml;/g, 'ü')
        .replace(/&Auml;/g, 'Ä')
        .replace(/&Ouml;/g, 'Ö')
        .replace(/&Uuml;/g, 'Ü')
        .replace(/&szlig;/g, 'ß');
}

// Funktion zum Einlesen der Dateien und Umwandeln der HTML-Sequenzen
function processFiles() {    
    fs.readFile(filepath_in, 'utf8', (err, data) => {
        if (err) {
            return console.log(`Fehler beim Lesen der Datei ${file}:`, err);
        }        
        // HTML-Escape-Sequenzen durch Umlaute ersetzen
        const updatedData = replaceHtmlEntities(data);
        
        // Datei mit konvertierten Umlauten speichern
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