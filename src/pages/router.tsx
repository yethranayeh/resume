import { Outlet, createHashRouter } from "react-router-dom";
import { Resume } from "./Resume/Resume";

const router = createHashRouter([
	{
		path: "/",
		element: <Outlet />,
		children: [
			{ path: "/", element: <Resume lang='tr' /> },
			{ path: "/en", element: <Resume lang='en' /> },
			{ path: "/tr", element: <Resume lang='tr' /> }
		]
	}
]);

export default router;
