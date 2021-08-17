const yargs = require("yargs");
const contacts = require("./contacts");

yargs.command({
    command: 'add',
    describe: 'Menambahkan kontak baru',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string'
        },
        email: {
            describe: 'Email',
            demandOption: false,
            type: 'string'
        },
        noHP: {
            describe: 'Nomor Hanphone',
            demandOption: true,
            type: 'string'
        },
    },

    handler(argv) {
        contacts.simpanContact(argv.nama, argv.email, argv.noHP);
    }
}).demandCommand();

// menampilkan daftar semua nama contact
yargs.command({
    command: 'list',
    describe: 'Menampilkan daftar kontak',
    handler() {
        contacts.listContact();
    }
});

// menampilkan detail kontak
yargs.command({
    command: 'detail',
    describe: 'Menampilkan detail kontak',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string',
        },
    }, 
    
    handler(argv) {
        contacts.detailContact(argv.nama);
    }
});

// hapus kontak
yargs.command({
    command: 'delete',
    describe: 'Menghapus kontak',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string',
        },
    }, 
    
    handler(argv) {
        contacts.deleteContact(argv.nama);
    }
});

yargs.parse();