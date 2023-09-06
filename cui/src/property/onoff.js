import React, { useState } from "react"

const SwitchControl = (props) => {
    const id = "slot_" + props.slot + "_channel_" + props.channel + "_" + props.label;
    const model = props.model;
    const [checked, setChecked] = useState(model.set);
    const onSwitchChange = (evt) => {
        setChecked(evt.target.checked);
    };
    return (
        <div>
            <span>{props.label}: </span>
            <label className="cswitch">
                <input type="checkbox" id={id} checked={checked} onChange={onSwitchChange}/>
                <span className="slider"></span>
            </label>
        </div>
    )
}

export default SwitchControl