import React from "react";
import '../matrial/controls.scss';
import { useParams } from 'react-router';

import PAM4Page from './pam4page';
import LaserPage from './laserpage';

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
				return ( <LaserPage chassis={chassis} slot={slot}/>)
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