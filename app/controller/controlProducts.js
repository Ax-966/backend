import products from "../models/products.js"

const filter = (id) => id ? {  id } : {};

export const getAll = (req, res) => { 
    const f = filter(req.params.id)

    products.find(f)
        .then(data => res.json(data)) 
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Error al obtener productos' });
        });
};
export const getOne = (req, res) => {
    const f = filter(req.params.id)
    products.find(f)
    .then(data => res.json(data))
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Error al buscar el producto'});
    })
}
export const insertOne =  async(req, res) => {
    try{
        const insertedProducts = await products.create(req.body);
        res.status(201).json(insertedProducts);
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: 'Error al agregar el producto'});
    }
}
export const insertMany = async (req, res) => {
    try {
        const insertedProducts = await products.insertMany(req.body); 
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
    
    products.updateOne(filter, { $set: body })
        .then((status) => {
            console.log("Resultado de la actualización:", status);
            

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
export const deleteOne = (req, res) => {
    const { id } = req.params;
    console.log("ID recibido para eliminar: ", id);
    
    const filter = { id: id};

    products.deleteMany(filter)
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
