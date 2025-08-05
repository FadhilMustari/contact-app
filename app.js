const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');

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

const pertanyaan1 = () => {
    return new Promise((resolve, rejects) => {
        rl.question("Masukkan nama: ", (nama) => {
            resolve(nama)
        })
    })
}

const pertanyaan2 = () => {
    return new Promise((resolve, rejects) => {
        rl.question('Masukkan Nomor HP: ', (noHP) => {
            resolve(noHP)
        })
    })
}

const main = async () => {
    const nama = await pertanyaan1()
    const noHP = await pertanyaan2();

    const data = {nama, noHP};
    const file = fs.readFileSync("data/contacts.json", "utf-8");
    const contacts = JSON.parse(file);
    contacts.push(data);
    fs.writeFileSync("data/contacts.json", JSON.stringify(contacts, null, 2));
    rl.close();
}

main()