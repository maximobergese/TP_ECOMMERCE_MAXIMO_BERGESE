const express = require('express');
const db = require('../database/connection'); 
const router = express.Router();

// Endpoint para obtener productos filtrados por rubro
router.get('/', async (req, res) => {
    const rubroId = req.query.rubro;
    
    let query = 'SELECT * FROM Productos';
    const params = [];

    if (rubroId && rubroId !== 'todos') {
        query += ' WHERE id_Rubro = ?';
        params.push(rubroId);
    }

    try {
        const [results] = await db.query(query, params);
        res.json(results);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});

module.exports = router;
