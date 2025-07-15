import React from "react";
import '../matrial/controls.scss';
import { useParams } from 'react-router';

import BertChannel from './bertchannel';
import BertGlobal from './bertglobal';
import BertSidebar from './bertsidebar';
import LaserChannel from './laserchannel';
import VOAChannel from './voachannel';

const Channel = () => {
	const { chassis, slot, channel } = useParams();

	try {
		switch (slot) {
			case "3":
				return <LaserChannel chassis={chassis} slot={slot} channel={channel}/>
			case "6":
				return <VOAChannel chassis={chassis} slot={slot} channel={channel}/>
			case "9":
				return (
					<div className="container-fluid bd-gutter">
						<BertSidebar/>
						<main className="bert-main-has-sidebar">
							<BertGlobal chassis={chassis} slot={slot}/>
							<BertChannel chassis={chassis} slot={slot} channel={channel}/>
						</main>
					</div>
				)
			default:
				return (
					<>
						<h5 className="placeholder-glow">
							<span className="placeholder col-6"></span>
						</h5>
					</>
				)
		}
	} catch (error) {
        return (
            <>
                <h5>500 Error</h5>
            </>
        )
    }
};

export default Channel;