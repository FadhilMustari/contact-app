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

const loadContacts = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);
    return contacts;
};

const simpanContact = (nama, noHP, email) => {
    const data = { nama, noHP, email };
    const contacts = loadContacts();

    const isDuplicate = contacts.find((file) => file.nama === nama);
    if (isDuplicate) {
        console.log(chalk.red.inverse.bold('Contact sudah terdaftar, gunakan nama lain!'));
        return false;
    }

    if (noHP) {
        if (!validator.isMobilePhone(noHP, 'id-ID')) {
            console.log(chalk.red.inverse.bold('Nomor hp tidak valid!'));
            return false;
        }
    }

    if (email) {
        if (!validator.isEmail(email)) {
            console.log(chalk.red.inverse.bold('Email tidak valid!'));
            return false;
        }
    }

    contacts.push(data);

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts, null, 2));

    console.log(chalk.green.inverse.bold('Data berhasil dimasukkan!'));

    // rl.close();
};

const tampilkanContact = () => {
    const contacts = loadContacts();

    // console.table(contacts)

    console.log(chalk.cyan.inverse.bold('Daftar kontak: '));
    contacts.forEach((element) => {
        console.log(`Nama: ${element.nama}`);
        console.log(`Nomor HP: ${element.noHP}`);
        if (element.email) {
            console.log(`Email: ${element.email}`);
        }
        console.log('-------------------------');
    });
};

const detailContact = (nama) => {
    const contacts = loadContacts();

    const contact = contacts.find((obj) => obj.nama.toLowerCase() === nama.toLowerCase());

    if (!contact) {
        console.log(chalk.red.inverse.bold('Kontak tidak ditemukan!'));
        return false;
    }

    console.log(`Nama: ${contact.nama}`);
    console.log(`Nomor HP: ${contact.noHP}`);
    if (contact.email) {
        console.log(`Email: ${contact.email}`);
    }
};

const deleteContact = (nama) => {
    const contacts = loadContacts();

    const newContacts = contacts.filter((obj) => obj.nama.toLowerCase() !== nama.toLowerCase());

    if (contacts.length === newContacts.length) {
        console.log(chalk.red.inverse.bold('Kontak tidak ditemukan!'));
        return false;
    }

    fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts, null, 2));
    console.log(chalk.green.inverse.bold(`Kontak dengan nama "${nama}" berhasil dihapus.`));
};

module.exports = { simpanContact, tampilkanContact, detailContact, deleteContact };
