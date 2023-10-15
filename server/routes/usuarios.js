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

router.post('/register', async (req, res) => {
    try {
        const { nombre, correo, contrasenia } = req.body;
        const user = new Usuario({ nombre, correo, contrasenia });
        await user.save();
        res.status(200).send('Usuario registrado satisfactoriamente');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al registrar usuario');
    }
});
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await Usuario.findOne({ nombre: username });

        if (!user) {
            res.status(401).send('Usuario no encontrado');
            return;
        }

        const isCorrectPassword = await user.isCorrectPassword(password);
        if (!isCorrectPassword) {
            res.status(401).send('Contraseña incorrecta');
            return;
        }

        // Genera un token JWT para el usuario
        const token = jwt.sign({ userId: user._id }, 'clave_secreta_del_token', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al autenticar usuario');
    }
});

// Exportación de router
module.exports = router;
