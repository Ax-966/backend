import * as controlProducts from  "../controller/controlProducts.js"
import { Router} from "express";


const selectionProducts = Router()

selectionProducts.get('/', controlProducts.getAll)
selectionProducts.get('/:id', controlProducts.getOne)
selectionProducts.post('/', controlProducts.insertOne)
selectionProducts.post('/', controlProducts.insertMany)
selectionProducts.put('/:id', controlProducts.updateOne)
selectionProducts.delete('/:id', controlProducts.deleteOne)

export default selectionProducts; 