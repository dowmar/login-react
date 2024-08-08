import { fetchAllOrders, createOrders } from "../services/orderService.js";

export const fetchOrders = async (req, res) => {
  try {
    const orders = await fetchAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const inputOrders = async (req, res) => {
  try {
    // console.log(req.body);
    const orders = req.body.orderData;
    const tableNumber = req.body.tableNumber;
    const createdOrders = await createOrders(orders, tableNumber);
    res.status(201).json(createdOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
