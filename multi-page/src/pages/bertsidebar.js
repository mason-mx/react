import React from "react";
import '../matrial/controls.scss';

const BertSidebar = (props) => {
    const id = "chassis_" + props.chassis + "_slot_" + props.slot + "_channel_" + props.channel + "_";
    
	return (
		<div className="offcanvas offcanvas-start bert-sidebar" id="offcanvas" aria-labelledby="offcanvasLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasLabel">Offcanvas</h5>
            </div>
            <div className="offcanvas-body">
                <ul className="">
                    <li className="list-group-item">PPG
                        <ul className="">
                            <li className="list-group-item">Output</li>
                            <li className="list-group-item">De Emphasis</li>
                            <li className="list-group-item">Pattern</li>
                        </ul>
                    </li>
                    <li className="list-group-item">ED
                        <ul className="">
                            <li className="list-group-item">Equalizer</li>
                            <li className="list-group-item">Error Detector</li>
                            <li className="list-group-item">Eye scan</li>
                        </ul>
                    </li>
                    <li className="list-group-item">A third item
                        <ul className="">
                            <li className="list-group-item">An item</li>
                            <li className="list-group-item">A second item</li>
                            <li className="list-group-item">A third item</li>
                            <li className="list-group-item">A fourth item</li>
                            <li className="list-group-item">And a fifth one</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
	);
};

export default BertSidebar;