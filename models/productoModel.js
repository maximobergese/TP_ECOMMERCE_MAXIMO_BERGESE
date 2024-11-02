const db = require('../database/connection');

const Producto = {
    getAll: async (descripcion = '', id_Rubro = '') => {
        let query = `
            SELECT pro.idProducto, pro.descripcion AS productoDescripcion, pro.precio, 
                    rub.descripcion AS rubroDescripcion, pro.url_Imagen
            FROM productos pro
            LEFT JOIN rubro rub ON rub.idRubro = pro.id_Rubro
            WHERE 1=1
        `;
        const params = [];

        if (descripcion) {
            query += ` AND pro.descripcion LIKE ?`;
            params.push(`%${descripcion}%`);
        }
        if (id_Rubro) {
            query += ` AND rub.idRubro = ?`;
            params.push(id_Rubro);
        }

        const [rows] = await db.query(query, params);
        return rows;
    }
};

module.exports = Producto;
