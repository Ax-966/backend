import ordersModel from '../models/orders.js';
import productsModel from '../models/products.js';  
import { v4 as uuidv4 } from 'uuid';  // id automatico 

export const createOrder = async (req, res) => {
    try {
        const { id, products, clientData } = req.body;

        if (!clientData.name || !clientData.phone || !clientData.address || !clientData.email) {
            return res.status(400).json({ error: 'Datos del cliente incompletos' });
        }
         const clientId =  uuidv4();

     
        const existingOrder = await ordersModel.findOne({ id });
        if (existingOrder) {
            return res.status(400).json({ error: 'El pedido con este ID ya existe' });
        }
        const productIds = products.map(product => product.productId);
        const productData = await productsModel.find({ _id: { $in: productIds } });

        // Validar la disponibilidad de stock para cada producto
        for (const product of products) {
            const productInfo = productData.find(p => p._id.toString() === product.productId);
            if (productInfo.stock < product.quantity) {
                return res.status(400).json({ error: `Stock insuficiente para ${productInfo.name}.` });
            }
        }
 



        const newOrder = new ordersModel({
            id,
            products,
            clientData: {
                ...clientData,
                id: clientId, 
            },
        });

        await newOrder.save();

        res.status(201).json({ 
            message: 'Pedido creado exitosamente', 
            order: newOrder 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const confirmOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await ordersModel.findOne({ id });

        if (!order) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }

        if (order.status !== 'pending') {
            return res.status(400).json({ error: 'El pedido ya fue confirmado o cancelado' });
        }

        for (const product of order.products) {
            const productData = await productsModel.findById(product.productId);

            if (!productData) {
                return res.status(404).json({ error: `Producto con ID ${product.productId} no encontrado.` });
            }

            if (productData.stock < product.quantity) {
                return res.status(400).json({ error: `Stock insuficiente para ${productData.name}.` });
            }

            
            productData.stock -= product.quantity;
            await productData.save();
        }

        order.status = 'confirmed';
        await order.save();

        res.json({ message: 'Pedido confirmado', order });
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
export const getConfirmedOrders = async (req, res) => {
    try {
        console.log("Buscando pedidos con estado 'confirmed'...");
        const orders = await ordersModel.find({ status: 'confirmed' }).populate('products.productId');
        console.log("Pedidos encontrados:", orders);

        if (orders.length === 0) {
            return res.status(404).json({ error: 'No hay pedidos confirmados' });
        }

        res.json({ message: 'Pedidos confirmados encontrados', orders });
    } catch (error) {
        console.error("Error:", error.message);
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