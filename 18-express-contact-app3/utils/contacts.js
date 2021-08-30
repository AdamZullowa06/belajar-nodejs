const fs = require('fs');

const dirPath = './data';
if(!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

const dataPath = './data/contacts.json';
if(!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);
    return contacts;
}

const findContact = (nama) => {
    const contacts = loadContact();
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
    return contact;
}

const saveContacts = (contacts) => {
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
}

const addContact = (contact) => {
    const contacts = loadContact();
    contacts.push(contact);
    saveContacts(contacts);
}

const cekDuplikat = (nama) => {
    contacts = loadContact();
    return contacts.find((contact) => contact.nama === nama);
}

const deleteContact = (nama) => {
    const contacts = loadContact();
    const filterContacts = contacts.filter((contact) => contact.nama !== nama);
    saveContacts(filterContacts);
}

const updateContact = (newContact) => {
    const contacts = loadContact();
    const filterContacts = contacts.filter((contact) => contact.nama !== newContact.oldNama);
    delete newContact.oldNama;
    filterContacts.push(newContact);
    saveContacts(filterContacts);
}

module.exports = {loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContact};