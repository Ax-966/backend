import mongoose  from "mongoose";
const { Schema, model} = mongoose;
const productsSchema = new Schema({
    id:
    {
        type: String,
        required: true,
        unique: true,
    },
    name:
    {
        type: String,
        required: true,
    },
    description:
    {
        type: String,
        required: false,
    },
    price:
    {
        type: Number,
        required: true,
    },
    image:
    {
        type: String,
        required: false,
    },
    category:
    {
        type: String,
        required: true,
    },
    stock:
    {
        type: Number,
        required: true,
        default: 0,
    },
})
const productsModel = model('selection', productsSchema)
export default productsModel;