import Note from '../models/note.model';

// create new note.
export const createNote = async (body) => {
  
  const data = await Note.create(body);
  return data;
  
};

// Get all Notes
export const getAllNotes = async (body) => {
  const data = await Note.find({ _id: body._id });
  return data;
};
//delete the notes
export const deleteNote = async (_id, body) => {
  await Note.findByIdAndDelete({ _id: _id });

  return '';
};

// Get note by id
export const getNoteById = async (_id) => {
  const data = await Note.findById({ _id: _id });
  return data;
};

// update note by id
export const updateNoteById = async (id, body) => {
  const data = await Note.findByIdAndUpdate(
    {
      _id: id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

 export const noteArchive  = async (id) =>{
  console.log(id)
  const data = await Note.findOne({ _id: id});
  let statusOfArchive ;
  if (data) {
    statusOfArchive = data.archive == false ? statusOfArchive = true : statusOfArchive = false;
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
export const noteTrash  = async (id, body) => {
  const data = await Note.findById({ _id: id, });
  let trashStatus;
  if (data) {
    trashStatus = data.trash == false ? true : false;
    const updatedData = await Note.findByIdAndUpdate(
      { _id:id },
      { trash: trashStatus },
      { new: true }
    );
    return updatedData;
  } else {
    throw new Error('Invalid Note Id');
  }
};

