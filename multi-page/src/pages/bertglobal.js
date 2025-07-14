import React from "react";
import '../matrial/controls.scss';

import SwitchControl from "../matrial/onoff";
import FInputControl from '../matrial/floatinglabel';
import FSelectControl from '../matrial/floatingselects';

const BertGlobal = (props) => {
    const id = "chassis_" + props.chassis + "_slot_" + props.slot + "_";
    
	return (
		<div className="container-fluid">
			<div className='row'>
				<div className='col-12 col-md-6 p-3 border border-3 border-info'>
					Chassis: {props.chassis} | Slot: {props.slot}
				</div>
			</div>
		</div>
	);
};

export default BertGlobal;