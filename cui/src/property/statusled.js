import React from "react"

import { CircleFill } from 'react-bootstrap-icons';

const LedControl = (props) => {
    //const id = "slot_" + props.slot + "_channel_" + props.channel + "_" + props.attr;
    const model = props.model;
    const color = props.model.set === 0 ? "text-secondary" : "text-success";
    try {
        return (
            <div className="row">
                <div className="col-12 mb-1 mb-lg-0 d-flex justify-content-between">
                    <div>{props.label}</div>
                    <div className={color}><CircleFill/></div>
                </div>
            </div>
        )
    } catch (error) {
        return (
            <>
                <span>{props.label}: </span><span>{JSON.stringify(model)}</span>
            </>
        )
    }
}

export default LedControl