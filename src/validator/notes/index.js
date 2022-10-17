const { NotePayloadSchema } = require("./schema")

/*
    *1. berkas index.js akan fokus dalam membuat fungsi sebagai validator yang menggunakan schema dari schema.js. 
*/ 
const NotesValidator = {
    // Fungsi validateNotePayload ini nantinya akan berguna untuk melakukan 
    // validasi dan mengevaluasi apakah validasi itu berhasil atau tidak
    validateNotePayload: (payload) => {
        const validationResult = NotePayloadSchema.validate(payload);
        if(validationResult.error) {
            throw new Error(validationResult.error.message)
        }
    }
}

module.exports = NotesValidator;