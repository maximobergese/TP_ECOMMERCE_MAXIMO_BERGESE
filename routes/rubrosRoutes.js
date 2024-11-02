const express = require('express');
const db = require('../database/connection'); // Asegúrate de que el path sea correcto para tu proyecto
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM rubro'); // Usando promesas
        res.json(results);
    } catch (err) {
        console.error('Error al obtener rubros:', err);
        res.status(500).json({ error: 'Error al obtener rubros' });
    }
});

module.exports = router;
