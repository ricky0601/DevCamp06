import { Order, OrderDetailItem, OrderSheet } from "../models/order.model";
import { httpClient, requestHandler } from "./http";

// export const order = async (orderData: OrderSheet) => {
//     const response = await httpClient.post("/orders", orderData);
//     return response.data;
// };

export const order = async (orderData: OrderSheet) => {
    return await requestHandler('post', '/orders', orderData);
}

export const fetchOrders = async () => {
    return await requestHandler<Order[]>('get', '/orders');
}

export const fetchOrder = async(orderId: number) => {
    return await requestHandler('get', `/orders/${orderId}`);
}