// buat fungsi bernama mapDBToModel dengan menerima objek note dari database
const mapDBToModel = ({id, title, body, tags, created_at, updated_at}) => ({
    // kemudian mengembalikan objek note baru
    id,
    title, 
    body, 
    tags,
    createdAt: created_at,
    updatedAt: updated_at,
});

module.exports = { mapDBToModel }