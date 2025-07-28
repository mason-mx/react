import React from "react";
import '../matrial/controls.scss';
import { useParams } from 'react-router';

import PAM4Page from './pam4page';
import Channel from "./channel";

const Module = (props) => {
	var { chassis, slot } = useParams();
	if(chassis === undefined) { chassis = props.chassis; }
	if(slot === undefined) { slot = props.slot; }

	try {
		switch (slot) {
			case "9":
				return (
					<PAM4Page chassis={chassis} slot={slot}/>
				)
			case "3":
			case "6":
				return (
						<div className="container-fluid bd-gutter">
							<div className="row">
								<Channel chassis={chassis} slot={slot} channel={1} />
								<Channel chassis={chassis} slot={slot} channel={2} />
							</div>
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

export default Module;