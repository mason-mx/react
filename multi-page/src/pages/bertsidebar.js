import React from "react";
import '../matrial/controls.scss';

const BertSidebar = (props) => {
    const id = "chassis_" + props.chassis + "_slot_" + props.slot + "_channel_" + props.channel + "_";
    
	return (
		<div className="offcanvas offcanvas-start d-none d-sm-block bert-sidebar" id="offcanvas" aria-labelledby="offcanvasLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasLabel">Offcanvas</h5>
            </div>
            <div className="offcanvas-body">
                <ul className="">
                    <li className="list-group-item"><a href="#global">Module configuration</a></li>
                    <li className="list-group-item">PPG
                        <ul className="">
                            <li className="list-group-item"><a href="#ppg_output">Output</a></li>
                            <li className="list-group-item"><a href="#ppg_de_emphasis">De Emphasis</a></li>
                            <li className="list-group-item"><a href="#ppg_pattern">Pattern</a></li>
                        </ul>
                    </li>
                    <li className="list-group-item">ED
                        <ul className="">
                            <li className="list-group-item"><a href="#ed_equalizer">Equalizer</a></li>
                            <li className="list-group-item"><a href="#ed_error_detector">Error Detector</a></li>
                            <li className="list-group-item"><a href="#ed_eye_scan">Eye scan</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
	);
};

export default BertSidebar;