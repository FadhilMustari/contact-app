const func = require("./contacts");

const main = async () => {
	const nama = await func.tulisPertanyaan("Masukkan nama anda: ");
	const noHP = await func.tulisPertanyaan("Masukkan nomor hp anda: ");

	func.simpanContact(nama, noHP);
};

main();
