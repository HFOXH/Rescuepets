/*

import express from 'express';
const router = express.Router();

const jwt = require('jsonwebtoken');

import User from '../models/user';

// Hash Contraseña
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/login/:email', async(req, res) => {
  const email = req.params.email;
  const body = _.pick(req.body, ['nombre', 'email', 'password', 'activo']);

  if(body.password){
    body.password = bcrypt.hashSync(req.body.pass, saltRounds);
  }

  try {

    const usuarioDB = await User.findByIdAndUpdate(email, body, {new: true, runValidators: true})

    return res.json(usuarioDB);
    
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrió un error',
      error
    })
  }

})

module.exports = router;



*/ 