 import * as orders from "../controller/orders.js";
import { Router} from "express";

const selectionOrder = Router()

selectionOrder.get('/:id', orders.getOrder);
selectionOrder.post('/', orders.confirmOrder);
selectionOrder.delete('/:id/', orders.deleteOrder);
export default selectionOrder; 