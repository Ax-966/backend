import ordersModel from '../models/orders.js';
import productsModel from '../models/products.js';  

export const confirmOrder = async (req, res) => {
    try {
     
        const { clientData, products } = req.body;

        if (!clientData || !products || products.length === 0) {
            return res.status(400).json({ error: 'Datos del cliente y productos son obligatorios.' });
        }

        const consolidatedProducts = [];
        const productMap = new Map();

        for (const product of products) {
            if (!productMap.has(product.productId)) {
                productMap.set(product.productId, { ...product, quantity: product.quantity });
            } else {
                productMap.get(product.productId).quantity += product.quantity;
            }
        }

        productMap.forEach((value) => consolidatedProducts.push(value));

    
        for (const product of consolidatedProducts) {
            const productData = await productsModel.findById(product.productId);

            if (!productData) {
                return res.status(404).json({ error: `Producto con ID ${product.productId} no encontrado.` });
            }

            if (productData.stock < product.quantity) {
                return res.status(400).json({ error: `Stock insuficiente para ${productData.name}.` });
            }

            
            productData.stock -= product.quantity;
            await productData.save();

 
            product.priceAtPurchase = productData.price;
        }

       
        const newOrder = new ordersModel({
            clientData,
            products: consolidatedProducts,
        });

  
        await newOrder.save();

        res.status(201).json({ message: 'Pedido confirmado', order: newOrder });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const getOrder = async (req, res) => {
    try {
        const { id } = req.params; 

        const order = await ordersModel.findOne({ id }).populate('products.productId');

        if (!order) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }

        res.json({ message: 'Pedido encontrado', order });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params; 


        const order = await ordersModel.findOne({ id });

        if (!order) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }

        if(order.status === 'pending'){
            
        }

     
        if (order.status === 'confirmed') {
            const currentTime = new Date();
            const confirmationTime = order.createdAt;

      
            const differenceInMinutes = Math.floor((currentTime - confirmationTime) / (1000 * 60));

            if (differenceInMinutes > 30) {
                return res.status(400).json({ 
                    error: 'No se puede eliminar un pedido después de 30 minutos de su confirmación.' 
                });
            }
        }

        await ordersModel.deleteOne({ id });

        res.json({ message: 'Pedido eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};