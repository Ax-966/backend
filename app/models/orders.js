import mongoose  from "mongoose";
const { Schema, model} = mongoose;
import productsModel from "./products.js"; 
import { consolidateProducts, calculateAmount } from "../middlewares/orders.js";

const ordersSchema = new Schema({
    id:
    {
        type:String,
        required: true,
        unique: true,
    },
    amount:
    {
        type:Number,
        required: false,
    },
    products:
    [
        {
            productId:
            {
                type: Schema.Types.ObjectId,
                ref: 'products',
                required: true,
            },
            quantity: 
            {
                type:Number,
                required: true,
                min: 1,
            },
            priceAtPurchase:
            {
                type:Number,
                required: false,
            },
        }
    ],
    clientData:
    {
        name:
        {
            type: String,
            required: true,
        },
        phone:
        {
            type:String,
            required:true,
        },
        address:
        {
            type:String,
            required: true,
        },
        email:
        {
            type:String,
            required: true,
        },
    },
    createdAt:
    {
        type: Date,
        default:  Date.now,
    },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' }
})
ordersSchema.pre('save', async function (next) {
    try {
         
        this.products = consolidateProducts(this);

        for (const product of this.products) {
            const productData = await productsModel.findById(product.productId);

            if (!productData) {
                throw new Error(`Producto con ID ${product.productId} no encontrado.`);
            }

            product.priceAtPurchase = productData.price;
        }

     
        this.amount = calculateAmount(this);
        next();
    } catch (error) {
        next(error);
    }
});

        


const ordersModel = model('orders', ordersSchema)
export default ordersModel; 