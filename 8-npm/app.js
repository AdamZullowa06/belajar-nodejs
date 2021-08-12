const validator = require('validator');
const chalk = require('chalk');

// console.log(validator.isEmail('adamzullowa@gmail.com'));
// console.log(validator.isMobilePhone('08111139312', 'id-ID'));
// console.log(validator.isNumeric('123456789'));

// console.log(chalk.italic.bgBlue.black('Hello World!'));
const nama = 'John Doe';
const pesan = chalk`Lorem ipsum dolor {bgBlue sit amet} consectetur {bgGreen.italic.black adipisicing} elit. Suscipit, accusamus?, Nama saya : ${nama}`;
console.log(pesan);