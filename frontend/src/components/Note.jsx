import React from "react";
import "../styles/Note.css";

function Note({ note, onDelete }) {
	const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");

	return (
		<>
			{/*<div className="note-container">
            <p className="note-title">{note.title}</p>
            <p className="note-content">{note.content}</p>
            <p className="note-date">{formattedDate}</p>
            <button className="delete-button" onClick={() => onDelete(note.id)}>
                Delete
            </button>
        </div>*/}

			<div className="bg-wh flex justify-center flex-col p-5">
				<h2 className="text-4xl font-extrabold dark:text-white">{note.title}</h2> 
        <p className="note-date">{formattedDate}</p>
				<p className="mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">{note.content}</p>
            <button className="delete-button" onClick={() => onDelete(note.id)}>
                Delete
            </button>
			</div>
		</>
	);
}

export default Note;
