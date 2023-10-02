import express from 'express';
const router = express.Router();

// Importar el modelo
import Usuario from '../models/usuarios'; // Cambiado el nombre de importación

// GET para buscar todos los registros de usuarios
router.get('/usuarios', async (req, res) => {
    try {
        const users = await Usuario.find(); // Cambiado el nombre de la variable a users
        res.json(users);
    } catch (error) {
        return res.status(500).json({ // Cambiado el código de estado a 500 en caso de error
            mensaje: 'Error',
            error
        });
    }
});

// Exportación de router
module.exports = router;
