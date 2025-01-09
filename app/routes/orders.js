 import * as orders from "../controller/orders.js";
import { Router} from "express";

const selectionOrder = Router()

selectionOrder.post('/', orders.createOrder)
selectionOrder.put('/:id/confirm', orders.confirmOrder);
selectionOrder.get('/:id', orders.getOrder);
selectionOrder.get('/confirmed', orders.getConfirmedOrders);
selectionOrder.delete('/:id/', orders.deleteOrder);
export default selectionOrder; 