import { render } from "preact";

import "@fontsource/roboto/latin-400.css";
import "@fontsource/roboto/latin-ext-400.css";
import "@fontsource/roboto/latin-500.css";
import "@fontsource/roboto/latin-ext-500.css";
import "@fontsource/roboto/latin-700.css";
import "@fontsource/roboto/latin-ext-700.css";
import "@fontsource/roboto/latin-900.css";
import "@fontsource/roboto/latin-ext-900.css";

import { App } from "./app.tsx";

render(<App />, document.getElementById("app")!);
