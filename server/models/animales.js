import mongoose from "mongoose";
const Schema = mongoose.Schema;

const animalSchema = new Schema({
  nombre: {
    type: String,
    required: true, 
  },
  sexo: {
    type: String,
    enum: ["Macho", "Hembra"], 
    required: true, 
  },
  edad: {
    type: Number,
    required: true, 
  },
  tamanio: String,
  descripcion: String,
  ubicacion: String,
  imagenes: [String], // Esto asume que las imágenes son URLs o rutas a archivos
  usuario: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    enum: ["Perro", "Gato"],
    required: true,
  },
  estado: {
    type: String,
    required: true, 
  }
});

// Convertir a modelo
const animales = mongoose.model("Animal", animalSchema, "Animales");

export default animales;
