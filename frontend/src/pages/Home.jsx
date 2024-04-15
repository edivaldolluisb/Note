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
			<div className="relative">
				<div className="relative md:fixed w-full md:w-7/12 min-h-screen inset-0">
					<div className="absolute top-0 right-0 bottom-0 left-0 m-auto p-20">
						{/* Note Form */}
						<h2 className="text-white text-2xl my-1 text-center">Create a Note 🌳</h2>
						<form onSubmit={createNote} >
							<label htmlFor="title" className="m-1">Title:</label>

							<input
								type="text"
								id="title"
								name="title"
								required
								onChange={(e) => setTitle(e.target.value)}
								value={title}
							/>
							<label htmlFor="content" className="m-1">Content:</label>
							
							<textarea
								id="content"
								name="content"
								required
								value={content}
								onChange={(e) => setContent(e.target.value)}
							></textarea>

							<input type="submit" value="Submit" className="m-1"></input>
						</form>
					</div>

					<img
						src="https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=935&q=80"
						className="object-cover w-full h-full"
					/>
				</div>

				{/* List Notes */}
				<div className="w-full md:w-5/12 ml-auto">
					{notes.map((note) => (
						<Note note={note} onDelete={deleteNote} key={note.id} />
					))}
					{/*<div className="bg-red-200 h-screen flex justify-center items-center flex-col p-10">
						<h2 className="text-4xl mb-5">Meet Benny</h2>
						<p className="mb-5">I was born 20 May 2020</p>
					</div>
					<div className="bg-red-50 h-screen flex justify-center items-center flex-col p-10">
						<h2 className="text-4xl mb-5">I love food</h2>
						<p className="mb-5">Bones, Pallets, and more!</p>
					</div>
					<div className="bg-red-200 h-screen flex justify-center items-center flex-col p-10">
						<h2 className="text-4xl mb-5">I love my humans</h2>
						<p className="mb-5">
							My humans are super special to me, and I love them
						</p>
					</div>*/}
				</div>
			</div>
		</div>
	);
}

export default Home;
