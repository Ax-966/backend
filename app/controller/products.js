import productsModel from "../models/products.js"


const filter = (id) => id ? {  id } : {};

export const getAll = (req, res) => { 
    const f = {...filter(req.params.id), stock: {$gte: 1}}

    productsModel.find(f)
    .then(data => {
        if (data.length === 0) {
            return res.status(404).json({ message: 'No hay productos' });
        }
        res.json(data); 
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Error al obtener productos' });
        });
};
export const getOne = (req, res) => {
    const f = {...filter(req.params.id), stock: {$gte: 1}}
   
    productsModel.find(f)
    .then(data => {
        if (data.length === 0) {
            return res.status(404).json({ message: 'No existe ese producto' });
        }
        res.json(data); 
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Error al buscar el producto'});
    })
}
export const getByName = (req, res) => {
    const { name } = req.params; 
    const filterName = {
        name: new RegExp(name, 'i'),
        stock: { $gte: 1},
    };
    productsModel.find(filterName)
        .then(data => {
            if (data.length === 0) {
                return res.status(404).json({ message: 'No existe ese producto' });
            }
            res.json(data); 
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Error al buscar el producto por nombre' });
        });
}; 


export const insertOne =  async(req, res) => {
    try{
        const insertedProducts = await productsModel.create(req.body);
        res.status(201).json(insertedProducts);
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: 'Error al agregar el producto'});
    }
}
export const insertMany = async (req, res) => {
    const { body } = req;

    try {
        
        const insertedProducts = await productsModel.insertMany(body);
        res.status(201).json(insertedProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al agregar productos' });
    }
};

export const updateOne = (req, res) => {
    const { id } = req.params; 
    const { body } = req;     

    const filter = { id: id };
    if (body.pieces !== undefined && body.numberOfPieces !== undefined) {
        if (body.pieces && body.numberOfPieces <= 1) {
            return res.status(400).json({ error: 'El producto tiene piezas.' });
        }
        if (!body.pieces && body.numberOfPieces !== 1) {
            return res.status(400).json({ error: 'El producto no lleva piezas.' });
        }
    }
    productsModel.updateOne(filter, { $set: body })
        .then((status) => {
            if (status.nModified === 0) {
                res.json({ message: "No se encontró el producto para actualizar" });
            } else {
                res.json({ message: "Datos actualizados" });
            }
        })
        .catch((err) => {
            console.error("Error al actualizar el producto:", err);
            res.status(500).json({ error: 'Error al actualizar el producto' });
        });
}
export const updateImage = async (req, res) => {
    const { id } = req.params; 
    const { file } = req; 

    if (!file) {
        return res.status(400).json({ error: 'No se ha subido ninguna imagen' });
    }

    const filter = { id: id };
    const update = { image: file.filename };

    try {
        const result = await productsModel.updateOne(filter, { $set: update });
        if (result.nModified === 0) {
            return res.status(404).json({ message: "No se encontró el producto para actualizar" });
        }
        res.json({ message: "Imagen actualizada correctamente" });
    } catch (err) {
        console.error("Error al actualizar la imagen:", err);
        res.status(500).json({ error: 'Error al actualizar la imagen' });
    }
};
export const deleteOne = (req, res) => {
    const { id } = req.params;
    const filter = { id: id};

    productsModel.deleteMany(filter)
        .then((result) => {
            console.log("Resultado de la eliminación: ", result);
            if(result.deletedCount  === 0)
            {
                res.json({ message: "No se encontró el producto para eliminar"});
            } else{
                res.json({ message: "Producto eliminado"})
            }
        })
        .catch((err) => {
            console.error("Error al eliminar el producto: ", err);
            res.status(500).json({error: 'Error al eliminar el producto'});
    });
}
