import { Link } from "react-router-dom";

export function Navbar() {
	return (
		<div className='no-print nav text-bold'>
			<Link to='en'>EN</Link>
			<Link to='tr'>TR</Link>
		</div>
	);
}
