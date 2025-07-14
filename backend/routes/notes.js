const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { verifyToken } = require('../middlewares/auth');
const notesController = require('../controllers/notesController');

router.use(verifyToken);

router.post('/', [
  body('title').notEmpty(),
  body('content').notEmpty()
], notesController.createNote);

router.get('/', notesController.getNotes);
router.get('/:id', notesController.getNoteById);
router.put('/:id', notesController.updateNote);
router.delete('/:id', notesController.deleteNote);

module.exports = router; 