const Bookmark = require('../models/Bookmark');
const { validationResult } = require('express-validator');
const axios = require('axios');

async function fetchTitle(url) {
  try {
    const res = await axios.get(url);
    const match = res.data.match(/<title>(.*?)<\/title>/i);
    return match ? match[1] : '';
  } catch {
    return '';
  }
}

exports.createBookmark = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    let { url, title, description, tags, favorite } = req.body;
    if (!title) title = await fetchTitle(url);
    const bookmark = new Bookmark({ url, title, description, tags, favorite, user: req.userId });
    await bookmark.save();
    res.status(201).json(bookmark);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getBookmarks = async (req, res) => {
  const { q, tags } = req.query;
  let filter = { user: req.userId };
  if (q) {
    filter.$or = [
      { title: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } },
      { url: { $regex: q, $options: 'i' } }
    ];
  }
  if (tags) {
    filter.tags = { $all: tags.split(',') };
  }
  try {
    const bookmarks = await Bookmark.find(filter).sort({ updatedAt: -1 });
    res.json(bookmarks);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getBookmarkById = async (req, res) => {
  try {
    const bookmark = await Bookmark.findOne({ _id: req.params.id, user: req.userId });
    if (!bookmark) return res.status(404).json({ error: 'Bookmark not found' });
    res.json(bookmark);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!bookmark) return res.status(404).json({ error: 'Bookmark not found' });
    res.json(bookmark);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!bookmark) return res.status(404).json({ error: 'Bookmark not found' });
    res.json({ message: 'Bookmark deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}; 