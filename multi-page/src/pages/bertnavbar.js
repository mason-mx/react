import React from "react";
import '../matrial/controls.scss';

const BertNavbar = (props) => {
    const id = "chassis_" + props.chassis + "_slot_" + props.slot + "_channel_" + props.channel + "_";
    
	return (
		<div className="offcanvas offcanvas-end d-none d-md-block bert-navbar" id="offcanvas" aria-labelledby="offcanvasLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasLabel">Offcanvas</h5>
            </div>
            <div className="offcanvas-body">
                <ul className="">
                    <li className="list-group-item">Summary</li>
                    <li className="list-group-item">Channel 1</li>
                    <li className="list-group-item">Channel 2</li>
                    <li className="list-group-item">Channel 3</li>
                    <li className="list-group-item">Channel 4</li>
                    <li className="list-group-item">Channel 5</li>
                    <li className="list-group-item">Channel 6</li>
                    <li className="list-group-item">Channel 7</li>
                    <li className="list-group-item">Channel 8</li>
                </ul>
            </div>
        </div>
	);
};

export default BertNavbar;