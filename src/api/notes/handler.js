/*
    * FUNGSI : MENANGANI PERMINTAAN DARI CLIENT DAN MERESPONNYA
    *1. NotesHandler memiliki akses untuk mengelola resource notes melalui properti this._service.
*/
const ClientError = require('../../exceptions/ClientError')
class NotesHandler {
    // Parameter service nantinya akan diberikan nilai instance dari kelas NotesService
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.postNoteHandler = this.postNoteHandler.bind(this);
        this.getNotesHandler = this.getNotesHandler.bind(this);
        this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this);
        this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this);
        this.deleteNoteByIdHandler = this.deleteNoteByIdHandler.bind(this);
    }

    async postNoteHandler(request, h) {
        try {
            this._validator.validateNotePayload(request.payload);
            // mendapatkan request dari client
            const { title = 'untitled', body, tags } = request.payload;
            // memasukkan catatan
            const noteId = await this._service.addNote({ title, body, tags }); //return id
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
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            // Server ERROR!
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    async getNotesHandler() {
        const notes = await this._service.getNotes();
        return {
            status: "success",
            data: {
                notes,
            },
        };
    }

    async getNoteByIdHandler(request, h) {
        try {
            // mendapatkan id yg dikirim client
            const { id } = request.params;
            // mendapatkan objek note sesuai id
            const note = await this._service.getNoteById(id);
            // set response
            return {
                status: 'success',
                data: {
                    note,
                },
            };
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            // Server ERROR!
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    async putNoteByIdHandler(request, h) {
        try {
            this._validator.validateNotePayload(request.payload);
            // mendapatkan id yg dikirim client
            const { id } = request.params;
            // memanggil fungsi this._notes.editNoteById()
            await this._service.editNoteById(id, request.payload);
            return {
                status: 'success',
                message: 'Catatan berhasil diperbarui',
            };
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            // Server ERROR!
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            // console.error(error);
            return response;
        }
    }
    async deleteNoteByIdHandler(request, h) {
        try {
            const { id } = request.params;
            await this._service.deleteNoteById(id);
            return {
                status: 'success',
                message: 'Catatan berhasil dihapus',
            };
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            // Server ERROR!
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }
}

// export module
module.exports = NotesHandler;
