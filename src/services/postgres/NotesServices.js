/*
    *FUNGSI : Mengelola resources dengan database postgreSql
*/
// melakukan koneksi ke database
const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapDBToModel } = require('../../utils');
class NotesService {
    constructor() {
        this._pool = new Pool(); //set instance class Pool()
    }
    // insert data ke database
    async addNote({ title, body, tags }) {
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;
        // objek queri untuk memasukkan note ke dalam db
        const query = {
            text: 'INSERT INTO notes VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
            values: [id, title, body, tags, createdAt, updatedAt],
        }
        // mengekseskusi query yang dibuat 
        const result = await this._pool.query(query);
        // cek apakah note berhasil ditambahkan ke dalam database
        if(!result.rows[0].id) {
            throw new InvariantError('Catatan gagal ditambahkan');
        }
        return result.rows[0].id;
    }
    // get all notes
    async getNotes() {
        const result = await this._pool.query('SELECT * FROM notes');
        return result.rows.map(mapDBToModel);
    }
    // get note by id
    async getNoteById(id) {
        const query = {
            text: 'SELECT * FROM notes WHERE id = $1',
            values: [id],
        };
        const result = await this._pool.query(query);
        // jika result.rows = 0 / (false), return NotFoundError
        if(!result.rows.length) {
            throw new NotFoundError('Catatan tidak ditemukan');
        }
        return result.rows.map(mapDBToModel)[0];
    }

}