/*
    * FUNGSI : MENANGANI PERMINTAAN DARI CLIENT DAN MERESPONNYA
    *1. NotesHandler memiliki akses untuk mengelola resource notes melalui properti this._service.
*/

class NotesHandler {
    // Parameter service nantinya akan diberikan nilai instance dari kelas NotesService
    constructor(service) {
        this._service = service;

        this.postNoteHandler = this.postNoteHandler.bind(this);
        this.getNotesHandler = this.getNotesHandler.bind(this);
        this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this);
        this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this);
        this.deleteNoteByIdHandler = this.deleteNoteByIdHandler.bind(this);
    }

    postNoteHandler(request, h) {
        try {
            // mendapatkan request dari client
            const { title = 'untitled', body, tags } = request.payload;
            // memasukkan catatan
            const noteId = this._service.addNote({ title, body, tags }); //return id
            // mengembalikan response
            const response = h.response({
                status: 'success',
                message: 'Catatan berhasil ditambahkan',
                data: {
                    noteId,
                },
            });
            response.code(201);
            return response;
        } catch (error) {
            const response = h.response({
                status: 'fail',
                message: error.message,
            });
            response.code(400);
            return response;
        }
    }

    getNotesHandler() {
        const notes = this._service.getNotes();
        return {
            status: "success",
            data: {
                notes,
            },
        };
    }

    getNoteByIdHandler(request, h) {
        try {
            // mendapatkan id yg dikirim client
            const { id } = request.params;
            // mendapatkan objek note sesuai id
            const note = this._service.getNoteById(id);
            // set response
            return {
                status: 'success',
                data: {
                    note,
                },
            };
        } catch (error) {
            const response = h.response({
                status: 'fail',
                message: error.message,
            });
            response.code(404);
            return response;
        }
    }

    putNoteByIdHandler(request, h) {
        try {
            // mendapatkan id yg dikirim client
            const { id } = request.params;
            // memanggil fungsi this._notes.editNoteById()
            this._service.editNoteById(id, request.payload);
            return {
                status: 'success',
                message: 'Catatan berhasil diperbarui',
            };
        } catch (error) {
            const response = h.response({
                status: 'fail',
                message: error.message,
            });
            response.code(404);
            return response;
        }
    }
    deleteNoteByIdHandler(request, h) {
        try {
            const { id } = request.params;
            this._service.deleteNoteById(id);
            return {
                status: 'success',
                message: 'Catatan berhasil dihapus',
            }
        } catch (error) {
            const response = h.response({
                status: 'fail',
                message: error.message,
            });
            response.code(404);
            return response;
        }
    }
}

// export module
module.exports = NotesHandler;
