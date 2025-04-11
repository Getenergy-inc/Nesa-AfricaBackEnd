import * as TicketService from "../services/ticket.service.js";



export const createTicket = async (req, res) => {
  try {
    const ticket = await TicketService.createTicket(req.body);
    res.status(201).json(ticket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



export const getAllTickets = async (req, res) => {
  try {
    const tickets = await TicketService.getAllTickets();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const getTicketById = async (req, res) => {
  try {
    const ticket = await TicketService.getTicketById(req.params.id);
    res.json(ticket);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};



export const updateTicket = async (req, res) => {
  try {
    const ticket = await TicketService.updateTicket(req.params.id, req.body);
    res.json(ticket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



export const deleteTicket = async (req, res) => {
  try {
    const result = await TicketService.deleteTicket(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
