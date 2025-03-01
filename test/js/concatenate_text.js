const fs = require('fs');

// Read the JSON file
fs.readFile('/home/rh/github/dev-baernreither-app/data/json/text/all/Bae_MF_1_all.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    // Parse the JSON data
    const jsonData = JSON.parse(data);

    // Concatenate all text strings in the key cont.value
    let concatenatedText = '';
    jsonData.results.bindings.forEach(binding => {
        if (binding.cont && binding.cont.value) {
            concatenatedText += binding.cont.value;
        }
    });

    //write the concatenated text to a file
    fs.writeFileSync('/home/rh/github/dev-baernreither-app/test/data/text/Bae_MF_1_all.txt', concatenatedText); ;
});