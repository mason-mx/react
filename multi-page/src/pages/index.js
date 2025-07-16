import React from 'react';
import { NavLink } from "react-router-dom";
import Navbar from '../component/navbar';


import './home.scss';

const Home = () => {
	return (
		<>
			<Navbar />
			<div className="container-fluid main-page">
				<ul class="list-group list-group-flush">
					<li class="list-group-item"><NavLink to="/c/2/s/9" activeStyle>PAM4</NavLink></li>
					<li class="list-group-item"><NavLink to="/c/2/s/6" activeStyle>Laser</NavLink></li>
					<li class="list-group-item">A third item</li>
					<li class="list-group-item">A fourth item</li>
					<li class="list-group-item">And a fifth one</li>
				</ul>
			</div>
		</>
	);
};

export default Home;