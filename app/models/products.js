import mongoose  from "mongoose";
const { Schema, model} = mongoose;
import { v4 as uuidv4 } from 'uuid';
const productsSchema = new Schema({
    id:
    {
        type: String,
        default: uuidv4,
        unique: true,
    },
    name:
    {
        type: String,
        required: true,
    },
    price:
    {
        type: Number,
        required: true,
    },
    pieces:
    {
        type: Boolean,
        required: true,
    },
    numberOfPieces:
    {
           type: Number,
            default: 1,
            validate: {
              validator: function (value) {
                if (this.pieces) {
                  return value >1; 
                }
                return value === 1; 
              },}
    },
    description:
    {
        type: String,
        required: false,
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
    }
})
const productsModel = model( 'products', productsSchema )
export default productsModel;