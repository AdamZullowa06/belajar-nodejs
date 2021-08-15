const { simpanContact, tulisPertanyaan } = require("./contacts");


const main = async () => {
    const nama = await tulisPertanyaan('Masukan nama anda : ');
    const email = await tulisPertanyaan('masukan email anda :');
    const noHP = await tulisPertanyaan('Masukan no HP anda : ');

    simpanContact(nama, email, noHP);
}

main();