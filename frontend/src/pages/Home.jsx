import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";
import Header from "../components/Header";

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
		<>
			<Header />
			<div>
				<div className="relative">
					<div
						className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
						aria-hidden="true"
					>
						<div
							className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
							style={{
								clipPath:
									"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
							}}
						/>
					</div>
					<div className="relative md:fixed w-full md:w-7/12 min-h-screen">
						<div className="absolute top-0 right-0 bottom-0 left-0 m-auto p-20">
							{/* Note Form */}
							<h2 className="text-slate-700 text-2xl my-1 text-center">
								Create a Note 🌳
							</h2>
							<form
								onSubmit={createNote}
								className="text-slate-700"
							>
								<label htmlFor="title" className="m-1">
									Title:
								</label>

								<input
									type="text"
									id="title"
									name="title"
									required
									onChange={(e) => setTitle(e.target.value)}
									value={title}
								/>
								<label htmlFor="content" className="m-1">
									Content:
								</label>

								<textarea
									id="content"
									name="content"
									required
									value={content}
									onChange={(e) => setContent(e.target.value)}
								></textarea>

								<input
									type="submit"
									value="Submit"
									className="form-button rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								></input>
							</form>
						</div>

						{/*<img
							src="https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=935&q=80"
							className="object-cover w-full h-full"
						/>*/}
					</div>

					{/* List Notes */}
					<div className="w-full md:w-5/12 ml-auto">
						{notes.map((note) => (
							<Note
								note={note}
								onDelete={deleteNote}
								key={note.id}
							/>
						))}
					</div>

					<div
					className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
					aria-hidden="true"
				>
					<div
						className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
						style={{
							clipPath:
								"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
						}}
					> </div>
				</div>
				</div>
			</div>
		</>
	);
}

export default Home;
