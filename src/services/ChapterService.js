import Chapter from "../models/postgresql/Chapter.js";

/**
 * Create a new chapter
 */
export const createChapter = async (data) => {
  try {
    if (!data.country) throw new Error("Country is required");

    const chapter = await Chapter.create(data);
    return chapter;
  } catch (error) {
    throw new Error("Error creating chapter: " + error.message);
  }xzxcvbnm
};

/**
 * Get all chapters
 */
export const getAllChapters = async () => {
  try {
    return await Chapter.findAll();
  } catch (error) {
    throw new Error("Error fetching chapters");
  }
};

/**
 * Get a single chapter by ID
 */
export const getChapterById = async (chapter_id) => {
  try {
    const chapter = await Chapter.findByPk(chapter_id);
    if (!chapter) throw new Error("Chapter not found");

    return chapter;
  } catch (error) {
    throw new Error("Error fetching chapter: " + error.message);
  }
};

/**
 * Update chapter by ID
 */
export const updateChapter = async (chapter_id, data) => {
  try {
    const chapter = await Chapter.findByPk(chapter_id);
    if (!chapter) throw new Error("Chapter not found");

    await chapter.update(data);
    return chapter;
  } catch (error) {
    throw new Error("Error updating chapter: " + error.message);
  }
};

/**
 * Delete chapter by ID
 */
export const deleteChapter = async (chapter_id) => {
  try {
    const chapter = await Chapter.findByPk(chapter_id);
    if (!chapter) throw new Error("Chapter not found");

    await chapter.destroy();
    return { message: "Chapter deleted successfully" };
  } catch (error) {
    throw new Error("Error deleting chapter: " + error.message);
  }
};
