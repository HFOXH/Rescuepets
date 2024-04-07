import mongoose from "mongoose";
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const userSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
    unique: true, // Asegura que el correo sea único en la base de datos
  },
  animales: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Animal' }], 
    default: [], 
  },
  contrasenia: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', function(next){
  if(this.isNew || this.isModified('contrasenia')){
    const document = this;
    bcrypt.hash(document.contrasenia,saltRounds,(err,haShedPassword)=>{
      if(err){
        next(err);
      }else{
        document.contrasenia = haShedPassword;
        next();
      }
    });
  }else{
    next();
  }
});

userSchema.methods.isCorrectPassword = function(contrasenia, callback){
  const self = this; // Almacenar una referencia al objeto 'this' -> para revisar si la convirtio bien
  bcrypt.compare(contrasenia, this.contrasenia, function(err, result){
    if(err){
      return callback(err);
    }else{
      return callback(null, result);
    }
  });
}


// Convertir a modelo
const Usuario = mongoose.model("Usuario", userSchema, "Usuarios");

export default Usuario;
