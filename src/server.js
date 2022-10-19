// mengimport dotenv dan mengkonfigurasinya
require('dotenv').config();
const Hapi = require('@hapi/hapi');
const notes = require('./api/notes'); //plugins
const NotesService = require('./services/postgres/NotesServices')
const NotesValidator = require('./validator/notes/index')

const init = async () => {
    // create instance NotesService
    const notesService = new NotesService();
    const server = Hapi.server({
        // nilai dari variable environment yang ada di berkas .env dapat diakses melalui properti process.env.
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    // daftarkan plugin notes
    await server.register({
        plugin: notes,
        options: {
            service: notesService,
            validator: NotesValidator, //NotesValidator = objek yang berisi fungsi validateNotePayload
        },
    });

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
