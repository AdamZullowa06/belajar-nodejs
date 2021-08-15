const fs = require('fs');
const readline = require('readline');
const dirPath = './data';
const filePath =  './data/contacts.json';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

if(!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

if(!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf-8');
}

const tulisPertanyaan = (pertanyaan) => {
    return new Promise((resolve, reject) => {
        rl.question(pertanyaan, (nama) => {
            resolve(nama)
        });
    });
}

const simpanContact = (nama, email, noHP) => {
    const contact = {nama, email, noHP};
    const file = fs.readFileSync('data/contacts.json', 'utf8');
    const contacts = JSON.parse(file);
    
    contacts.push(contact);
    
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    console.log('Kontak berhasil disimpan');
    rl.close();
}

module.exports = {tulisPertanyaan, simpanContact};