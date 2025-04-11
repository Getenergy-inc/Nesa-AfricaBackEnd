import MerchandiseOrder from "../models/postgresql/MerchandiseOrder.js";

/**
 * Create a new merchandise order
 */
export const createMerchandiseOrder = async (data) => {
  const { item, shipping, paid_from_wallet } = data;

  if (!item) throw new Error("Item is required");
  if (!shipping) throw new Error("Shipping details are required");

  return await MerchandiseOrder.create({
    item,
    shipping,
    paid_from_wallet: paid_from_wallet ?? false,
  });
};

/**
 * Get all merchandise orders
 */
export const getAllMerchandiseOrders = async () => {
  return await MerchandiseOrder.findAll();
};

/**
 * Get a single merchandise order by ID
 */
export const getMerchandiseOrderById = async (id) => {
  const order = await MerchandiseOrder.findByPk(id);
  if (!order) throw new Error("Merchandise order not found");
  return order;
};

/**
 * Update a merchandise order by ID
 */
export const updateMerchandiseOrder = async (id, data) => {
  const order = await MerchandiseOrder.findByPk(id);
  if (!order) throw new Error("Merchandise order not found");

  await order.update(data);
  return order;
};

/**
 * Delete a merchandise order by ID
 */
export const deleteMerchandiseOrder = async (id) => {
  const order = await MerchandiseOrder.findByPk(id);
  if (!order) throw new Error("Merchandise order not found");

  await order.destroy();
  return { message: "Merchandise order deleted successfully" };
};
