import * as ChapterService from "../services/ChapterService.js";



export const create = async (req, res) => {
  try {
    const chapter = await ChapterService.createChapter(req.body);
    res.status(201).json(chapter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const findAll = async (req, res) => {
  try {
    const chapters = await ChapterService.getAllChapters();
    res.status(200).json(chapters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const findOne = async (req, res) => {
  try {
    const chapter = await ChapterService.getChapterById(req.params.chapter_id);
    res.status(200).json(chapter);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const updated = await ChapterService.updateChapter(req.params.chapter_id, req.body);
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const result = await ChapterService.deleteChapter(req.params.chapter_id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
