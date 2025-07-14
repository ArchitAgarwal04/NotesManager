const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { verifyToken } = require('../middlewares/auth');
const bookmarksController = require('../controllers/bookmarksController');

router.use(verifyToken);

router.post('/', [
  body('url').isURL(),
], bookmarksController.createBookmark);

router.get('/', bookmarksController.getBookmarks);
router.get('/:id', bookmarksController.getBookmarkById);
router.put('/:id', bookmarksController.updateBookmark);
router.delete('/:id', bookmarksController.deleteBookmark);

module.exports = router; 