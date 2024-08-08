import { fetchOrder, createOrder } from "../models/order.js";

export const fetchAllOrders = async () => {
  return await fetchOrder();
};

export const createOrders = async (orders, tableNumber) => {
  return await createOrder(orders, tableNumber);
};
