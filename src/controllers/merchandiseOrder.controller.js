import * as MerchandiseOrderService from "../services/merchandiseOrder.service.js";




export const createMerchandiseOrder = async (req, res) => {
  try {
    const order = await MerchandiseOrderService.createMerchandiseOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



export const getAllMerchandiseOrders = async (req, res) => {
  try {
    const orders = await MerchandiseOrderService.getAllMerchandiseOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const getMerchandiseOrderById = async (req, res) => {
  try {
    const order = await MerchandiseOrderService.getMerchandiseOrderById(req.params.id);
    res.json(order);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};



export const updateMerchandiseOrder = async (req, res) => {
  try {
    const order = await MerchandiseOrderService.updateMerchandiseOrder(req.params.id, req.body);
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



export const deleteMerchandiseOrder = async (req, res) => {
  try {
    const result = await MerchandiseOrderService.deleteMerchandiseOrder(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
