import { useEffect, useState } from "react";
import axios from "axios";
import NoteCard from "./components/NoteCard";

const App = () => {
  const [formValues, setFormValues] = useState({ title: "", description: "" });
  const [allNotes, setAllNotes] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(formValues);
    if (editId) {
      let updatedNote = await axios.put(`http://localhost:3000/notes/${editId}`,formValues)
      //console.log(updateNote)
      setEditId(null)
    } else {
      let res = await axios.post(
        "http://localhost:3000/notes/create",
        formValues,
      );
      console.log(res);
    }

    setFormValues({ title: "", description: "" });
    getAllNotes();
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  const getAllNotes = async () => {
    try {
      let res = await axios.get("http://localhost:3000/notes/all-notes");
      //console.log(res)
      setAllNotes(res.data.data);
    } catch (err) {
      console.log("Error while fetching all notes : ", err);
    }
  };

  const deleteNote = async (id) => {
    try {
      let res = await axios.delete(`http://localhost:3000/notes/${id}`);
      console.log(res);
      await getAllNotes();
    } catch (err) {
      console.log("error in delete note", err);
    }
  };
  const updateNote = async (note) => {
    setEditId(note._id)
    setFormValues({
      title: note.title,
      description: note.description
    })
  };
  return (
    <div className="min-h-screen bg-black p-10 text-white">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-4xl font-bold">Notes App</h1>

        <form
          onSubmit={handleSubmit}
          className="mb-10 rounded-xl border border-gray-800 bg-gray-950 p-6"
        >
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Title
            </label>

            <input
              type="text"
              value={formValues.title}
              name="title"
              onChange={handleChange}
              placeholder="Enter note title..."
              className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Description
            </label>

            <input
              type="text"
              value={formValues.description}
              name="description"
              onChange={handleChange}
              placeholder="Enter note description..."
              className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 active:scale-95"
          >
            {editId? "Update Note":"Add Note"}
          </button>
        </form>

        <div>
          <h3 className="mb-5 text-2xl font-semibold">All Notes</h3>

          {/* Notes will come here */}
          <div className=" flex flex-col gap-5 justify-around flex-wrap">
            {allNotes.map((note) => (
              <NoteCard key={note._id} note={note} onDelete={deleteNote} onEdit={updateNote}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
