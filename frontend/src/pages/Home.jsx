import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";

function Home() {
	const [notes, setNotes] = useState([]);
	const [content, setContent] = useState("");
	const [title, setTitle] = useState("");

	useEffect(() => {
		getNotes();
	}, []);

	const getNotes = () => {
		api.get("/api/notes/")
			.then((res) => res.data)
			.then((data) => {
				setNotes(data);
				console.log(data);
			})
			.catch((err) => alert(err));
	};

	const deleteNote = (id) => {
		api.delete(`/api/notes/delete/${id}/`)
			.then((res) => {
				if (res.status === 204) alert("Note deleted!");
				else alert("Failed to delete note.");
				getNotes();
			})
			.catch((error) => alert(error));
	};

	const createNote = (e) => {
		e.preventDefault();
		api.post("/api/notes/", { content, title })
			.then((res) => {
				if (res.status === 201) alert("Note created!");
				else alert("Failed to make note.");
				getNotes();
			})
			.catch((err) => alert(err));
	};

	return (
		<div>
            {/* List Notes */}
			<div className="bg-white py-24 sm:py-32">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-2xl lg:mx-0">
						<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
							My notes
						</h2>
						<p className="mt-2 text-lg leading-8 text-gray-600">
                            Here are some notes I've taken. They are simple
						</p>
					</div>
					{<div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {notes.map((note) => (
                            <Note note={note} onDelete={deleteNote} key={note.id} />
                        ))}
					</div>}
				</div>
			</div>


			{/* Note Form */}
			<h2>Create a Note</h2>
			<form onSubmit={createNote}>
				<label htmlFor="title">Title:</label>
				<br />
				<input
					type="text"
					id="title"
					name="title"
					required
					onChange={(e) => setTitle(e.target.value)}
					value={title}
				/>
				<label htmlFor="content">Content:</label>
				<br />
				<textarea
					id="content"
					name="content"
					required
					value={content}
					onChange={(e) => setContent(e.target.value)}
				></textarea>
				<br />
				<input type="submit" value="Submit"></input>
			</form>
		</div>
	);
}

export default Home;
