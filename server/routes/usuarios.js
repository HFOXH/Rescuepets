import express from 'express';
const router = express.Router();

// Importar el modelo
import Usuario from '../models/usuarios';

// GET para buscar todos los registros de usuarios
router.get('/usuarios', async (req, res) => {
    try {
        const users = await Usuario.find(); 
        res.json(users);
    } catch (error) {
        return res.status(500).json({ 
            mensaje: 'Error',
            error
        });
    }
});

// GET para buscar un usuario
router.get('/usuarios/:usuario', async (req, res) => {
    try {
        const usuario = req.params.usuario;
        const user = await Usuario.find({nombre: usuario}); 
        res.json(user);
    } catch (error) {
        return res.status(500).json({ 
            mensaje: 'Error, usuario no encontrado',
            error
        });
    }
});

router.post('/register', async (req, res) => {
    try {
        const { nombre, correo, contrasenia, celular } = req.body;
        const user = new Usuario({ nombre, correo, contrasenia, celular });
        await user.save();
        res.status(200).send('Usuario registrado satisfactoriamente');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al registrar usuario');
    }
});
router.post('/login', async (req, res) => {
    try {
        const { correo, contrasenia } = req.body;

        const user = await Usuario.findOne({ correo: correo });
        console.log(user);
        if (!user) {
            console.log("usuario no encontrado");
            res.status(401).send('Usuario no encontrado');
            return;
        }

        user.isCorrectPassword(contrasenia, (err, isCorrect) => {
            if (err && !isCorrect) {
                res.status(401).send('Contraseña incorrecta');
                return;
            }
            // Genera un token JWT para el usuario
            const jwt = require('jsonwebtoken');
            const token = jwt.sign({ userId: user._id }, 'clave_secreta_del_token', { expiresIn: '1h' });
            const userName = user.nombre;
            const celular = user.celular;
            res.json({ token, userName, celular });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al autenticar usuario');
    }
});


// Exportación de router
module.exports = router;
