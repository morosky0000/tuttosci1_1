const fs = require('fs');

// Read the HTML file
const htmlContent = fs.readFileSync('fis_html_response.html', 'utf8');

// Create JSON object with the HTML content
const jsonData = {
  html_content: htmlContent,
  source: "FIS Alpine Skiing Biographies - Italian Athletes",
  url: "https://www.fis-ski.com/DB/alpine-skiing/biographies.html?nationcode=ITA",
  timestamp: new Date().toISOString(),
  description: "Static HTML content from FIS website for Italian alpine skiing athletes"
};

// Write to JSON file
fs.writeFileSync('fis_static_data.json', JSON.stringify(jsonData, null, 2));

console.log('✅ File fis_static_data.json creato con successo!');
console.log('📄 Dimensione HTML:', htmlContent.length, 'caratteri');
console.log('🎯 Ora puoi utilizzare questo file nel tuo workflow invece della chiamata GET');