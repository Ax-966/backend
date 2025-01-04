import  express  from "express";
import { configDotenv } from "dotenv";
import dbConn from "./app/config/db.js";
import cors from "cors";
 import selectionProducts from './app/router/selectionProducts.js'  

configDotenv();
const {
    PORT = 3000,
    URI  = "mongodb://localhost:27017/chat-bot"
} = process.env;

dbConn(URI);
const app = express();

const corsOptions = {
    origin: "http://localhost:4500", 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
};
app.use(cors(corsOptions)); 

app.use(express.json());
app.use("/products", selectionProducts)

app.use(express.static('client'));



app.listen(PORT,  () => console.log(` service running on port ${PORT}`))
