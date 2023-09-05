import { note } from '@hapi/joi/lib/base';
import Note from '../models/note.model';

// create new note.
export const createNote = async (body) => {
  const data = await Note.create(body);

  return data;
};

// Get all Notes
export const getAllNotes = async (body) => {
  const data = await Note.find({ created_by: body.created_by});
  return data;
};
//delete the notes
export const deleteNote = async (_id,body) => {
  
  const allNotes = await Note.find({created_by: body.created_by})
  const checkNote = allNotes.filter((note)=>{
    return note._id == _id
  })
  if(checkNote.length == 0){
    throw new Error('note does not exists for this user');
  }else{
    await Note.deleteOne({ _id: {$eq:_id }});
  
    return '';
  }
};

// Get note by id
export const getNoteById = async (_id,created_by ) => {
  
  const data = await Note.findById({ _id: _id,created_by:created_by })
  return data;
};

// update note by id
export const updateNoteById = async (id, body) => {
   const getNotes = await getAllNotes(body);
   const checkNote = getNotes.filter((note)=> note._id == id);
   console.log(checkNote);
   if(checkNote.length == 0){
    throw new Error("no note available for this user")
   }
   else{
  const data = await Note.updateOne(
    body,
    {
      new: true
    }
  );
  return data;
}
};

export const noteArchive = async (id) => {
  const data = await Note.findOne({ _id: id });
  let statusOfArchive;
  if (data) {
    statusOfArchive =
      data.archive === false
        ? (statusOfArchive = true)
        : (statusOfArchive = false);
    const updatedData = await Note.findByIdAndUpdate(
      {
        _id: id
      },
      { archive: statusOfArchive },
      { new: true }
    );
    return updatedData;
  } else {
    throw new Erro('User enter invalid Note Id');
  }
};

//trash note by id
export const noteTrash = async (id) => {
  const data = await Note.findById({ _id: id });
  let trashStatus;
  if (data) {
    trashStatus = data.trash === false ? true : false;
    const updatedData = await Note.findByIdAndUpdate(
      { _id: id },
      { trash: trashStatus },
      { new: true }
    );
    return updatedData;
  } else {
    throw new Error('Invalid Note Id');
  }
};
