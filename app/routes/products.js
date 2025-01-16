import * as products  from  "../controller/products.js"
import upload from '../config/multer.js'; 
import { Router} from "express";

const selectionProducts = Router()

selectionProducts.get('/', products.getAll)
selectionProducts.get('/:id', products.getOne)
selectionProducts.get('/name/:name', products.getByName)
selectionProducts.post('/one', products.insertOne)
selectionProducts.post('/many', products.insertMany)
selectionProducts.put('/:id', products.updateOne)
selectionProducts.put('/image/:id', upload.single('image'), products.updateImage);
selectionProducts.delete('/:id', products.deleteOne)

export default selectionProducts; 