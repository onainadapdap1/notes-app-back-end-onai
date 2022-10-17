/*
    *1. FUNGSI : MENANGANI SETIAP PERMINTAAN YANG MENRARAH KE URL /notes
*/ 
/*
    *handler yang akan digunakan pada route kali ini dimasukkan sebagai parameter fungsi. 
*/ 
const routes = (handler) => [
    {
        method: "POST",
        path: "/notes",
        handler: handler.postNoteHandler,
    },
    {
        method: "GET",
        path: "/notes",
        handler:  handler.getNotesHandler,
    },
    {
        method: "GET",
        path: "/notes/{id}",
        handler: handler.getNoteByIdHandler,
    },
    {
        method: "PUT",
        path: "/notes/{id}",
        handler: handler.putNoteByIdHandler,
    },
    {
        method: "DELETE",
        path: "/notes/{id}",
        handler: handler.deleteNoteByIdHandler,
    },
];

// export module
module.exports = routes;