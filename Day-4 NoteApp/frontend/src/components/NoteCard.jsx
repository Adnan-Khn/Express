import { Pencil, Trash2 } from "lucide-react";

const NoteCard = ({ note, onDelete, onEdit }) => {
  return (
    <div className="group relative rounded-xl border border-gray-800 bg-gray-950 p-5 transition hover:border-gray-700 hover:bg-gray-900">
      {/* Header */}
      <div className="mb-3 flex items-start justify-between gap-4">
        <h3 className="truncate text-lg font-semibold text-white">
          {note.title.length > 50 ? note.title.substring(0, 50) : note.title}
        </h3>

        {/* Action buttons */}
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => onEdit(note)}
            className="rounded-md p-2 text-gray-400 transition hover:bg-gray-800 hover:text-blue-400"
            title="Edit note"
          >
            <Pencil size={16} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(note._id)}
            className="rounded-md p-2 text-gray-400 transition hover:bg-gray-800 hover:text-red-400"
            title="Delete note"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="flex justify-between items-center">
        <p className="line-clamp-3 text-sm leading-6 text-gray-400">
          {note.description.length > 50
            ? note.description.substring(0, 50) + "..."
            : note.description}
        </p>
        {/* <p className="text-sm text-gray-500">
          {new Date(note.date).toLocaleString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </p> */}
        <p className="text-[0.625rem] text-gray-400">
          {new Date(note.date).toLocaleString("en-IN", {
            day: "numeric",
            month: "numeric",
            year: "2-digit",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
      </div>
    </div>
  );
};

export default NoteCard;
