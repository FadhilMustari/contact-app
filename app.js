const yargs = require('yargs');
const { simpanContact } = require('./contacts');

yargs.command({
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
			demandOption: true,
			type: 'string'
		},
	},
	handler(argv) {
		simpanContact( argv.nama, argv.noHP, argv.email )
	}
})

yargs.parse()