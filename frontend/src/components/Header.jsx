import { Link } from "react-router-dom";
import logo from "../assets/icon.svg";

function Header() {
	return (
		<nav className="bg-white border-gray-200 dark:bg-gray-900">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
				<Link
					to="/"
					className="flex items-center space-x-3 rtl:space-x-reverse"
				>
					<img
						src={logo}
						className="h-8"
						alt="Flowbite Logo"
					/>
					<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
						Note
					</span>
				</Link>

				<div
					className="hidden w-full md:block md:w-auto"
					id="navbar-default"
				>
					<ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
						<li>
							<Link
								to="/"
								className="flex text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100"
							>
								More
							</Link>
						</li>
						<li>
							<Link
								to="/logout"
								className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Logout
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Header;
