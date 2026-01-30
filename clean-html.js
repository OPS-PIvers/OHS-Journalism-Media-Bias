import fs from 'fs';
import path from 'path';

const filePath = path.resolve('dist/index.html');
let html = fs.readFileSync(filePath, 'utf8');

// Remove type="module" and crossorigin
html = html.replace(/<script\s+type="module"\s*([^>]*)>/gi, '<script $1>');
html = html.replace(/<script\s+crossorigin\s*([^>]*)>/gi, '<script $1>');
html = html.replace(/\scrossorigin(="anonymous"|="")?/gi, '');

// Fix the weird style rel="stylesheet" if it exists
html = html.replace(/<style\s+rel="stylesheet"\s*>/gi, '<style>');

// Clean up double spaces in tags
html = html.replace(/<script\s+>/gi, '<script>');

fs.writeFileSync(filePath, html);
console.log('Cleaned up dist/index.html for GAS compliance.');
