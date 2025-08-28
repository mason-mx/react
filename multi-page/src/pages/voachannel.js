import { useState, useEffect } from "react";
import '../matrial/controls.scss';

import FInputControl from '../matrial/floatinglabel';
import FSelectControl from '../matrial/floatingselects';

const VOAChannel = (props) => {
    const id = "chassis_" + props.chassis + "_slot_" + props.slot + "_channel_" + props.channel + "_";
	const [model, setModel] = useState(props.model);
	const [output_power_set, setOutputpowerSet] = useState(0);
	const [output_power_act, setOutputpowerAct] = useState(0);


	useEffect(() => {
		var parsedData = JSON.parse(props.msg);
		if(parsedData.text !== undefined)
		{
			if(parsedData.text.chassis === 0)
			{
				// Message is for me
				switch (parsedData.text.key) {
                    case "output_power":
                        {
							if(parsedData.text.hasOwnProperty("set")) {
								setOutputpowerSet(parsedData.text.set);
							} else if(parsedData.text.hasOwnProperty("act")) {
								setOutputpowerAct(parsedData.text.act);
							}
						}
                        break;
                    default:
                        break;
                }
			}
		}
	}, [props.msg]);
    
	return (
		<div className='col-12 col-md-6 p-3 border border-3 border-info'>
			Chassis: {props.chassis} | Slot: {props.slot} | Channel: {props.channel}
			Message: {model.power.actual}
			<div className='my-3'>
				<FSelectControl label="Mode" id={id + "mode"} setval={output_power_act}/>
			</div>
			<div className='my-3'>
				<FInputControl label="Test 2" id={id + "wav"}/>
			</div>
			<div className='my-3'>
				<FInputControl label="Test 2" id={id + "freq"}/>
			</div>
		</div>
	);
};

export default VOAChannel;