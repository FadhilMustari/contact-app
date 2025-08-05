const fs = require('fs');

const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output: process.stdout
});

const dirPath = './data';
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync('./data');
}

const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

rl.question("Masukkan nama: ", (nama) => {
    rl.question("Masukkan umur: ", (umur) => {
        const data = { nama, umur }
        const file = fs.readFileSync('data/contacts.json', 'utf-8')
        const contacts = JSON.parse(file)
        contacts.push(data)
        fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))
        rl.close();
    });
});