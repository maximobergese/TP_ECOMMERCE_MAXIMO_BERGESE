const db = require('../database/connection');

const rubro = {
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM rubro');
        return rows;
    }
};

module.exports = rubro;
