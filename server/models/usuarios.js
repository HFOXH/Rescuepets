import mongoose from "mongoose";
const Schema = mongoose.Schema;

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
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Animal' }], // Corregido el nombre de la colección de referencia a 'Animal'
    default: [], // Puedes establecer un valor por defecto si lo deseas
  },
  contrasenia: {
    type: String,
    required: true,
  },
});

// Convertir a modelo
const Usuario = mongoose.model("Usuario", userSchema, "Usuarios");

export default Usuario;
