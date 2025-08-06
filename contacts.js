const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

// const readline = require('readline');
// const rl = readline.createInterface({
//     input : process.stdin,
//     output: process.stdout
// });

const dirPath = './data';
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync('./data');
}

const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

// const tulisPertanyaan = (pertanyaan) => {
//     return new Promise((resolve, rejects) => {
//         rl.question(pertanyaan, (answer) => {
//             resolve(answer)
//         })
//     })
// }

const simpanContact = (nama, noHP, email) => {
	const data = { nama, noHP, email };
	const file = fs.readFileSync("data/contacts.json", "utf-8");
	const contacts = JSON.parse(file);

    const isDuplicate = contacts.find( (file) => file.nama === nama)
    if (isDuplicate) {
        console.log(chalk.red.inverse.bold('Contact sudah terdaftar, gunakan nama lain!'))
        return false
    }

    if (noHP) {
        if (!validator.isMobilePhone(noHP, 'id-ID')) {
            console.log(chalk.red.inverse.bold("Nomor hp tidak valid!"));
            return false
        }
    }
    
    if (email) {
        if (!validator.isEmail(email)) {
            console.log(chalk.red.inverse.bold("Email tidak valid!"));
			return false;
        }
    }
    
	contacts.push(data);

	fs.writeFileSync("data/contacts.json", JSON.stringify(contacts, null, 2));

    console.log('Data berhasil dimasukkan!')

	// rl.close();
};

module.exports = { simpanContact };
