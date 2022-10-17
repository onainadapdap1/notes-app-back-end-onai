/*
     *"Hapi plugin notes ini akan bertanggung jawab untuk menangani setiap permintaan yang mengarah ke url /notes".
    *1. menggunakan router dan handler pada plugin notes
*/

const NotesHandler = require("./handler");
const routes = require("./routes");

module.exports = {
    name: 'notes',
    version: '1.0.0',
    register: async (server, { service, validator}) => {
        // Dua parameter fungsi ini adalah server dan objek options yang menampung service.
        // instance dari class NotesHandler dengan nama notesHandler. Kemudian nilai service dan validator
        // pada constructor-nya
        const notesHandler = new NotesHandler(service, validator);
        // daftarkan routes yang sudah kita buat pada server Hapi.
        server.route(routes(notesHandler)); //routes = fungsi yang mengembalikan array
    },
}