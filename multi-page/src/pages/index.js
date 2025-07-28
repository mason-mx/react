import React from 'react';
import { NavLink } from "react-router-dom";
import Navbar from '../component/navbar';

import './home.scss';

const Home = () => {
	return (
		<>
			<Navbar />
			<div className="container-fluid main-page">
				<ul className="list-group list-group-flush">
					<li className="list-group-item"><NavLink to="/c/1/s/9">PAM4</NavLink></li>
					<li className="list-group-item"><NavLink to="/c/1/s/3">Laser</NavLink></li>
					<li className="list-group-item"><NavLink to="/c/2/s/1">Power</NavLink></li>
					<li className="list-group-item"><NavLink to="/c/2/s/2">VOA</NavLink></li>
					<li className="list-group-item">And a fifth one</li>
				</ul>
			</div>
		</>
	);
};

export default Home;