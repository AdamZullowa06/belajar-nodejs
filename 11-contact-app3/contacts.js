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

const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf8');
    const contacts = JSON.parse(file);
    return contacts;
}


const simpanContact = (nama, email, noHP) => {
    const contact = {nama, email, noHP};

    const contacts = loadContact();

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
};

const listContact = () => {
    const contacts = loadContact();
    console.log(chalk.cyan.bold('Daftar Kontak : '));
    contacts.forEach((contact, i) => {
        console.log(`${i + 1}. ${contact.nama} - ${contact.noHP}`);
    });
}

const detailContact = (nama) => {
    const contacts = loadContact();
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
    
    if(!contact) {
        console.log(chalk.bgRed.bold(`${nama} tidak ditemukan!`));
        return false;
    }

    console.log(chalk.cyan.bold(contact.nama));
    console.log(chalk.cyan.bold(contact.noHP));
    if(contact.email) {
        console.log(chalk.cyan.bold(contact.email));
    }
}

const deleteContact = (nama) => {
    const contacts = loadContact();
    const newContacts = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase());
    
    if(contacts.length === newContacts.length) {
        console.log(chalk.bgRed.bold(`${nama} tidak ditemukan!`));
        return false;
    }

    fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts));
    console.log(chalk.green.bold(`kontak ${nama} berhasil dihapus!`));
}

module.exports = {simpanContact, listContact, detailContact, deleteContact};