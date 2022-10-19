/*
    *FUNGSI : Mengelola resources dengan database postgreSql
*/ 
const {Pool} = require('pg');
class NotesService {
    constructor() {
        this._pool = new Pool();
    }
}