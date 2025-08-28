import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import Navbar from '../component/navbar';

import './home.scss';

const Home = () => {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [devices, setDevices] = useState([]);
	useEffect(() => {
		fetch("http://localhost/instrument")
			.then(res => res.json())
			.then(
				(result) => {
					setIsLoaded(true);
					setDevices(result.devices);
				},
				(error) => {
				setIsLoaded(true);
				setError(error);
				}
			)
	}, [])

	if (!isLoaded) {
		return (
		<>
			<div class="d-flex justify-content-center">
				<div class="spinner-grow text-primary" role="status">
				<span class="visually-hidden">...</span>
				</div>
				<div class="spinner-grow text-secondary" role="status">
				<span class="visually-hidden">...</span>
				</div>
				<div class="spinner-grow text-success" role="status">
				<span class="visually-hidden">...</span>
				</div>
			</div>
		</>);
	} else {
		return (
			<>
				<Navbar />
				<div className="container-fluid main-page">
					<ul className="list-group list-group-flush">
						{devices.map((item, index) => <li className="list-group-item" key={index}><NavLink to={"/c/"+ item.chassis_index + "/s/" + item.device_index}>{item.model}</NavLink></li>)}
					</ul>
				</div>
			</>
		);
	}
};

export default Home;