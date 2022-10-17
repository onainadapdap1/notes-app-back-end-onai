const Hapi = require('@hapi/hapi');
const notes = require('./api/notes'); //plugins
const NotesService = require('./services/inMemory/NotesServices')
const NotesValidator = require('./validator/notes/index')

const init = async () => {
    // create instance NotesService
    const notesService = new NotesService();
    const server = Hapi.server({
        port: 5000,
        host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
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
