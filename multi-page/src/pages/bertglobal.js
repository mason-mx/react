import React from "react";
import '../matrial/controls.scss';

import SwitchControl from "../matrial/onoff";
import FInputControl from '../matrial/floatinglabel';
import FSelectControl from '../matrial/floatingselects';

const BertGlobal = (props) => {
    const id = "chassis_" + props.chassis + "_slot_" + props.slot + "_";
    
	return (
		<>
			<h5>Chassis: {props.chassis} | Slot: {props.slot}</h5>
			<h5 className="anchor-link" id="global">Module configuration</h5>
			<div className="container-fluid">
				<div className='row'>
					<div className='col-12 col-lg-6 my-3'>
						<FSelectControl label="Test 1" id={id + "freq"}/>
					</div>
					<div className='col-12 col-lg-6 my-3'>
						<FSelectControl label="Test 1" id={id + "freq"}/>
					</div>
					<div className='col-12 col-lg-6 my-3'>
						<FSelectControl label="Test 1" id={id + "freq"}/>
					</div>
					<div className='col-12 col-lg-6 my-3'>
						<FSelectControl label="Test 1" id={id + "freq"}/>
					</div>
				</div>
			</div>
		</>
	);
};

export default BertGlobal;