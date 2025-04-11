import Forum from "../models/postgresql/Forum.js";

/**
 * Create a new forum
 */
export const createForum = async (forumData) => {
  const { topic, region_chapter_id, participants, messages } = forumData;

  if (!topic || !region_chapter_id) {
    throw new Error("Topic and Region Chapter ID are required");
  }

  return await Forum.create({ topic, region_chapter_id, participants, messages });
};

/**
 * Get all forums
 */
export const getAllForums = async () => {
  return await Forum.findAll();
};

/**
 * Get a single forum by ID
 */
export const getForumById = async (forum_id) => {
  const forum = await Forum.findByPk(forum_id);
  if (!forum) {
    throw new Error("Forum not found");
  }
  return forum;
};

/**
 * Update a forum
 */
export const updateForum = async (forum_id, data) => {
  const forum = await Forum.findByPk(forum_id);
  if (!forum) {
    throw new Error("Forum not found");
  }

  await forum.update(data);
  return forum;
};

/**
 * Delete a forum
 */
export const deleteForum = async (forum_id) => {
  const forum = await Forum.findByPk(forum_id);
  if (!forum) {
    throw new Error("Forum not found");
  }

  await forum.destroy();
  return { message: "Forum deleted successfully" };
};
