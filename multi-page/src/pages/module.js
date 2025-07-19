import React from "react";
import '../matrial/controls.scss';
import { useParams } from 'react-router';

import PAM4Page from './pam4page';
import LaserPage from './laserpage';

const Module = () => {
	const { chassis, slot } = useParams();

	try {
		switch (slot) {
			case "9":
				return (
					<PAM4Page />
				)
			case "3":
				return ( <LaserPage />)
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