import React from "react";
import { Nav, NavLink, NavMenu } from "./navbarelement";

const Navbar = () => {
	return (
		// <>
		// 	<Nav>
		// 		<NavMenu>
		// 			<NavLink to="/" activeStyle>Home</NavLink>
		// 			<NavLink to="/about" activeStyle>About it</NavLink>
		// 			<NavLink to="/contact" activeStyle>Contact Us</NavLink>
		// 			<NavLink to="/blogs" activeStyle>Blogs</NavLink>
		// 			<NavLink to="/sign-up" activeStyle>Sign Up</NavLink>
		// 		</NavMenu>
		// 	</Nav>
		// </>
		<header>
			<nav className="navbar navbar-expand-lg bg-body-tertiary">
				<div className="container-fluid">
					<a className="navbar-brand" href="#">Navbar</a>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
						<a className="nav-link active" aria-current="page" href="#">Home</a>
						</li>
						<li className="nav-item">
						<a className="nav-link" href="#">Link</a>
						</li>
						<li className="nav-item dropdown">
						<a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
							Dropdown
						</a>
						<ul className="dropdown-menu">
							<li><a className="dropdown-item" href="#">Action</a></li>
							<li><a className="dropdown-item" href="#">Another action</a></li>
							<li><hr className="dropdown-divider" /></li>
							<li><a className="dropdown-item" href="#">Something else here</a></li>
						</ul>
						</li>
					</ul>
					<form className="d-flex" role="search">
						<input className="form-control me-2" type="search" placeholder="Module" aria-label="Module"/>
						<button className="btn btn-outline-success" type="submit">Search</button>
					</form>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;