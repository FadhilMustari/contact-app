const yargs = require('yargs');
const { simpanContact, tampilkanContact, detailContact, deleteContact } = require('./contacts');

yargs
    .command({
        command: 'add',
        describe: 'Menambahkan contact baru',
        builder: {
            nama: {
                describe: 'Nama Lengkap',
                demandOption: true,
                type: 'string',
            },
            noHP: {
                describe: 'Nomor HP',
                demandOption: true,
                type: 'string',
            },
            email: {
                describe: 'Email',
                demandOption: false,
                type: 'string',
            },
        },
        handler(argv) {
            simpanContact(argv.nama, argv.noHP, argv.email);
        },
    })
    .demandCommand();

yargs.command({
    command: 'list',
    describe: 'Menampilkan seluruh daftar nama dan nomor hp contact',
    handler() {
        tampilkanContact();
    },
});

yargs.command({
    command: 'detail',
    describe: 'Menampilkan detail sebuah contact',
    builder: {
        nama: {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        detailContact(argv.nama);
    },
});

yargs.command({
    command: 'delete',
    describe: 'Menghapus contact',
    builder: {
        nama: {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        deleteContact(argv.nama);
    },
});

yargs.parse();
