import React from "react";
import '../matrial/controls.scss';

import SwitchControl from "../matrial/onoff";
import FInputControl from '../matrial/floatinglabel';
import FSelectControl from '../matrial/floatingselects';

const BertChannel = (props) => {
    const id = "chassis_" + props.chassis + "_slot_" + props.slot + "_channel_" + props.channel + "_";
    
	return (
		<>
			<h5>Working on channel: {props.channel}</h5>
			<h5 className="anchor-link" id="ppg_output">Output</h5>
			<div className="container-fluid">
				<div className='row g-2'>
					<div className='col-12 col-lg-6 p-3'>
						<div className="card" aria-hidden="true">
							<img src="https://optics.ansys.com/hc/article_attachments/360058686514" className="card-img-top" alt="..." height="200px" />
							<div className="card-body">
								<h5 className="card-title placeholder-glow">
								<span className="placeholder col-6"></span>
								</h5>
								<p className="card-text placeholder-glow">
								<span className="placeholder col-7"></span>
								<span className="placeholder col-6"></span>
								<span className="placeholder col-8"></span>
								</p>
							</div>
						</div>
					</div>
					<div className='col-12 col-lg-6 p-3'>
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
			<h5 className="anchor-link" id="ppg_de_emphasis">De Emphasis</h5>
			<div className="container-fluid">
				<div className='row'>
					<div className='col-12 col-lg-6 p-3'>
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
					<div className='col-12 col-lg-6 p-3'>
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
			<h5 className="anchor-link" id="ppg_pattern">Pattern</h5>
			<div className="container-fluid">
				<div className='row'>
					<div className='col-12 col-lg-6 p-3'>
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
					<div className='col-12 col-lg-6 p-3'>
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
			<h5 className="anchor-link" id="ed_equalizer">Equalizer</h5>
			<div className="container-fluid">
				<div className='row'>
					<div className='col-12 col-lg-6 p-3'>
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
			<h5 className="anchor-link" id="ed_error_detector">Error Detector</h5>
			<div className="container-fluid">
				<div className='row'>
					<div className='col-12 col-lg-6 p-3'>
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
			<h5 className="anchor-link" id="ed_eye_scan">Eye scan</h5>
			<div className="container-fluid">
				<div className='row'>
					<div className='col-12 col-lg-6 p-3'>
						<div className="card" aria-hidden="true">
							<img src="https://optics.ansys.com/hc/article_attachments/360058686514" className="card-img-top" alt="..." height="200px" />
							<div className="card-body">
								<h5 className="card-title placeholder-glow">
								<span className="placeholder col-6"></span>
								</h5>
								<p className="card-text placeholder-glow">
								<span className="placeholder col-7"></span>
								<span className="placeholder col-6"></span>
								<span className="placeholder col-8"></span>
								</p>
							</div>
						</div>
					</div>
					<div className='col-12 col-lg-6 p-3'>
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
					<div className='col-12 col-lg-6 p-3'>
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
		</>
	);
};

export default BertChannel;