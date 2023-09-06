import express from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import * as noteController from '../controllers/note.controller';
import { newNoteValidator } from '../validators/note.validator';

const router = express.Router();

//route to create a new note
router.post('',newNoteValidator,userAuth, noteController.createNote);

//route to get all notes
router.get('', userAuth, noteController.getAllNotes);

//route to delete notes by id
router.delete('/:_id', userAuth, noteController.deleteNote);

// router to update note by id
router.put('/:_id', newNoteValidator,  userAuth,noteController.updateNoteById);

//get note by id
router.get('/:_id', userAuth, noteController.getNoteById);

//route to archive Note
router.put('/:_id/archive', userAuth, noteController.noteArchive);

//route to trash Note
router.put('/:_id/trash', userAuth, noteController.noteTrash);

export default router;
