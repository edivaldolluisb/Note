import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";
import { Link } from "react-router-dom";
import { Github } from "lucide-react";

function Form({ route, method }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const name = method === "login" ? "Login" : "Register";

	const handleSubmit = async (e) => {
		setLoading(true);
		e.preventDefault();

		try {
			const res = await api.post(route, { username, password });
			if (method === "login") {
				localStorage.setItem(ACCESS_TOKEN, res.data.access);
				localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
				navigate("/");
			} else {
				navigate("/login");
			}
		} catch (error) {
			alert(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit} className="form-container">
				{/*<h1>{name}</h1>*/}
				<input
					className="form-input"
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder="Username"
				/>
				<input
					className="form-input"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
				/>
				{loading && <LoadingIndicator />}
				<button
					className="form-button rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					type="submit"
				>
					{name}
				</button>
			</form>

            <div className="mt-10 flex items-center justify-center gap-x-6">
							<a
								href="https://github.com/edivaldolluisb"
								className="flex text-sm font-semibold leading-6 text-gray-900 "
							>
								<Github className="mr-1" /> GitHub
							</a>
							<Link
								to={method === "login" ? "/register" : "/login"}
								className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								{method === "login" ? "Register" : "Login"} <span aria-hidden="true">→</span>
							</Link>
						</div>

		</>
	);
}

export default Form;
