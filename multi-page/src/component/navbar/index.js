import React from "react";
import { Nav, NavLink, NavMenu } from "./navbarelement";

const Navbar = () => {
	return (
		<>
			<Nav>
				<NavMenu>
					<NavLink to="/" activeStyle>Home</NavLink>
					<NavLink to="/about" activeStyle>About it</NavLink>
					<NavLink to="/contact" activeStyle>Contact Us</NavLink>
					<NavLink to="/blogs" activeStyle>Blogs</NavLink>
					<NavLink to="/sign-up" activeStyle>Sign Up</NavLink>
				</NavMenu>
			</Nav>
		</>
	);
};

export default Navbar;