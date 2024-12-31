import mongoose from 'mongoose'
export default function dbConn(URI){
    mongoose.connect(URI)
    .then(() => console.log("conectado a la base de datos"))
    .catch(err => console.log(err))
}