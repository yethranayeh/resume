import { Outlet, createHashRouter } from "react-router-dom";
import { Resume } from "./Resume/Resume";

import { LanguageHandler } from "./LanguageHandler";
import { i18nResources } from "../i18n/config";

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
			...Object.keys(i18nResources).map((lang) => ({ path: `/${lang}`, element: <Resume /> }))
		]
	}
]);

export default router;
