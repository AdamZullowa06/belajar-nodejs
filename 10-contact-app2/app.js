const yargs = require("yargs");
const { simpanContact } = require("./contacts");

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
        simpanContact(argv.nama, argv.email, argv.noHP);
    }
});

yargs.parse();