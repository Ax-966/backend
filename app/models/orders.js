import mongoose  from "mongoose";
const { Schema, model} = mongoose;


const ordersModel = model('selection', ordersSchema)
export default ordersModel;