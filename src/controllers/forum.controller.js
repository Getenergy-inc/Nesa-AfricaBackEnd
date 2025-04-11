import * as ForumService from "../services/forum.service.js";



export const createForum = async (req, res) => {
  try {
    const forum = await ForumService.createForum(req.body);
    res.status(201).json(forum);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllForums = async (req, res) => {
  try {
    const forums = await ForumService.getAllForums();
    res.json(forums);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getForumById = async (req, res) => {
  try {
    const forum = await ForumService.getForumById(req.params.id);
    res.json(forum);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const updateForum = async (req, res) => {
  try {
    const forum = await ForumService.updateForum(req.params.id, req.body);
    res.json(forum);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteForum = async (req, res) => {
  try {
    const result = await ForumService.deleteForum(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
