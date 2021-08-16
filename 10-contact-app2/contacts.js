const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');
const dirPath = './data';
const filePath =  './data/contacts.json';

if(!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

if(!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf-8');
}

const simpanContact = (nama, email, noHP) => {
    const contact = {nama, email, noHP};
    const file = fs.readFileSync('data/contacts.json', 'utf8');
    const contacts = JSON.parse(file);

    const duplicate = contacts.find((contact) => contact.nama === nama);
    if(duplicate) {
        console.log(chalk.bgRed.bold('nama sudah terdaftar, gunakan nama lain!'));
        return false;
    }
    
    if(email) {
        if(!validator.isEmail(email)) {
            console.log(chalk.bgRed.bold('email tidak valid!'));
            return false;
        }
    }

    if(!validator.isMobilePhone(noHP, 'id-ID')) {
        console.log(chalk.bgRed.bold('no HP tidak valid!'));
        return false;
    }
    contacts.push(contact);

    
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    console.log(chalk.green.bold('Kontak berhasil disimpan!'));
}

module.exports = {simpanContact};