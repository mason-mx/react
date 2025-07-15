import React from 'react';
import Navbar from '../component/navbar';
import './home.scss';

import BertChannel from './bertchannel';
import BertGlobal from './bertglobal';
import BertSidebar from './bertsidebar';
import BertNavbar from './bertnavbar';

const Home = () => {
	return (
		<>
			<Navbar />
			<div className="container-fluid bd-gutter">
				<BertSidebar/>
				<main className="bert-main-has-sidebar bert-main-has-navbar bert-page-has-navbar">
					<BertGlobal chassis={1} slot={2}/>
					<BertChannel chassis={1} slot={2} channel={3}/>
				</main>
				<BertNavbar/>
			</div>
		</>
	);
};

export default Home;