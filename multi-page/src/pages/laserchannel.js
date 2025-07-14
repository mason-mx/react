import React from "react";
import '../matrial/controls.scss';

import SwitchControl from "../matrial/onoff";
import FInputControl from '../matrial/floatinglabel';
import FSelectControl from '../matrial/floatingselects';

const LaserChannel = (props) => {
    const id = "chassis_" + props.chassis + "_slot_" + props.slot + "_channel_" + props.channel + "_";
    
	return (
		<div className="container-fluid">
			<div className='row'>
				<div className='col-12 col-md-6 p-3 border border-3 border-info'>
					Chassis: {props.chassis} | Slot: {props.slot} | Channel: {props.channel}
					<div className='my-3'>
						<FSelectControl label="Test 1" id={id + "freq"}/>
					</div>
					<div className='my-3'>
						<FInputControl label="Test 1" id={id + "wav"}/>
					</div>
					<div className='my-3'>
						<SwitchControl label="Test 1" id={id + "state"}/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LaserChannel;