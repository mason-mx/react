import React, { useState, useEffect, useRef } from "react"

import { LockFill, UnlockFill } from 'react-bootstrap-icons';
const default_model = {
    set: false,
    safety: 0
};

const SwitchControl = (props) => {
    const id = "slot_" + props.slot + "_channel_" + props.channel + "_" + props.label;
    const [model, setModel] = useState(props.model === undefined ? default_model :  props.model);
    const [checked, setChecked] = useState(model.set);
    const inputRef = useRef(null);
    const onSwitchChange = (evt) => {
        inputRef.current.indeterminate = true;
        if(typeof props.onSubmit === 'function')
        {
            props.onSubmit(evt.target.checked);
        }
    };

    useEffect(() => {
        setModel(props.model === undefined ? default_model :  props.model);
    }, [props.model]);

    useEffect(() => {
        setChecked(model.set);
        inputRef.current.indeterminate = false;
    }, [model.set]);

    return (
        <div className={model.safety === 1 ? "p-3 switch-property readonly": "p-3 switch-property"}>
            <div className="d-flex justify-content-between">
                <div>
                    <span>{props.label}: </span><span>{model.set ? "ON":"OFF"}</span>
                </div>
                <div className="d-flex align-items-center">
                    {model.safety === 1 ? <LockFill/>:<UnlockFill/>}
                </div>
                <div>
                    <label className="cswitch">
                        <input type="checkbox" id={id} checked={checked} ref={inputRef} onChange={onSwitchChange}/>
                        <span className="slider"></span>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default SwitchControl