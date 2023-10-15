import express from 'express'
import multer from 'multer';
const router = express.Router();

//importar el modelo 
import animales from '../models/animales';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Carpeta donde se almacenan los archivos
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Nombre del archivo
    },
  });

  const upload = multer({ storage: storage });

// Agregar un nuevo animal
router.post('/nuevo-animal', upload.array('imagenes', 5), async(req, res)=>{
    const body = req.body;
    try {
        const imagenesUrls = req.files.map((archivo) => {
            return `../uploads/${archivo.filename}`;
          });
          body.imagenes = imagenesUrls;
        const data= await animales.create(body);
        res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            mensaje:'Ocurrio un error inesperado',
            error
        })
    }
});
//Get buscar todos los registros
router.get('/animales', async(req,res)=>{
    try {
        const animal = await animales.find();
        res.json(animal);
    } catch (error) {
        return res.status(400).json({
            mensaje:'Error',
            error
        })
    }
});
//Get con parametro para Editar
router.get('/buscarParametro/:id', async(req,res)=>{
    const _id=req.params.id;
    try {
        const animal = await animales.findOne({_id});
        res.json(animal);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Error',
            error
        })
    }
});
//Eliminar Animal
router.delete('/eliminarParametro/:id', async(req,res)=>{
    const _id=req.params.id;
    try {
        const animal = await animales.findByIdAndDelete({_id});
        if(!animal){
            return res.status(400).json({
                mensaje: 'No se encontró mascota',
                error
            })
        }
        res.json(animal);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Error al eliminar',
            error
        })
    }
})
//Actualizar
router.put('/actualizar/:id', async(req,res)=>{
    const _id=req.params.id;
    const body = req.body;
    try {
        const animal = await animales.findByIdAndUpdate(
            _id, 
            body,{new: true});
            res.json(animal);
        
    } catch (error) {
        return res.status(400).json({
            mensaje: 'No se logro actualizar',
            error
        })
    }
})

  
//Exportacion de router
module.exports=router;