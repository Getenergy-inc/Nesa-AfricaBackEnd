import Ticket from "../models/postgresql/Ticket.js";



/**
 * Create new ticket
 */
export const createTicket = async (data) => {
  const { user_id, ticket_type, QR_code, event } = data;

  if (!ticket_type) throw new Error("Ticket type is required");
  if (!event) throw new Error("Event name is required");
  if (!QR_code) throw new Error("QR code is required");

  const existingQR = await Ticket.findOne({ where: { QR_code } });
  if (existingQR) throw new Error("QR code already exists");

  return await Ticket.create({ user_id, ticket_type, QR_code, event });
};

/**
 * Get all tickets
 */
export const getAllTickets = async () => {
  return await Ticket.findAll();
};

/**
 * Get a ticket by ID
 */
export const getTicketById = async (ticket_id) => {
  const ticket = await Ticket.findByPk(ticket_id);
  if (!ticket) throw new Error("Ticket not found");
  return ticket;
};

/**
 * Update a ticket
 */
export const updateTicket = async (ticket_id, data) => {
  const ticket = await Ticket.findByPk(ticket_id);
  if (!ticket) throw new Error("Ticket not found");

  if (data.QR_code && data.QR_code !== ticket.QR_code) {
    const existingQR = await Ticket.findOne({ where: { QR_code: data.QR_code } });
    if (existingQR) throw new Error("QR code already exists");
  }

  await ticket.update(data);
  return ticket;
};

/**
 * Delete a ticket
 */
export const deleteTicket = async (ticket_id) => {
  const ticket = await Ticket.findByPk(ticket_id);
  if (!ticket) throw new Error("Ticket not found");

  await ticket.destroy();
  return { message: "Ticket deleted successfully" };
};
