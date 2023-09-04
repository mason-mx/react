import React from "react"

const SwitchControl = (props) => {
    const id = "slot_" + props.slot + "_channel_" + props.channel + "_" + props.label;
    const model = props.model;
    return (
        <>
            <span>{props.label}: </span>
            <label className="cswitch">
                <input type="checkbox" id={id} checked={model.set} disabled/>
                <span className="slider"></span>
            </label>
        </>
    )
}

export default SwitchControl