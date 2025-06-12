import { Outlet, createHashRouter } from "react-router-dom";
import { Resume } from "./Resume/Resume";

import { LanguageHandler } from "./LanguageHandler";
import { Navbar } from "../components/NavBar";

const router = createHashRouter([
	{
		path: "/",
		element: (
			<>
				{/* <Navbar /> */}
				<LanguageHandler />
				<Outlet />
			</>
		),
		children: [
			{ path: "/", element: <Resume /> },
			{ path: "/en", element: <Resume /> },
			{ path: "/tr", element: <Resume /> }
		]
	}
]);

export default router;
