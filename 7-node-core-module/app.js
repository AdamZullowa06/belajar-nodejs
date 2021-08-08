// core module
// file system
const fs = require('fs');
const { stringify } = require('querystring');

// menuliskan string ke file (synchronous)
// try {
//     fs.writeFileSync('data/test.txt', 'Hello World secara scynchronous!');
// } catch(err) {
//     console.log(err);
// }

// menuliskan string ke file (Asynchronous)
// fs.writeFile('data/test.txt', 'Hello world secara Asnychronous', (err) => {
//     if(err) throw err;
// })

// membaca isi file (synchronous)
// const data = fs.readFileSync('data/test.txt', 'utf-8');
// console.log(data);

// membaca isi file (asynchronous)
// fs.readFile('data/test.txt', 'utf-8', (err, data) => {
//     if(err) throw err;
//     console.log(data)
// })


// readline
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Masukan nama anda : ', (nama) => {
    rl.question('Masukan no HP anda : ', (noHP) => {
        const contact = {nama, noHP};
        const file = fs.readFileSync('data/contacts.json', 'utf8');
        const contacts = JSON.parse(file);

        contacts.push(contact);
        // console.log(contacts);

        fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
        console.log('Input berhasil disimpan');
        rl.close();
    });
});