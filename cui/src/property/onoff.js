import React, { useState, useEffect, useRef } from "react"

const SwitchControl = (props) => {
    const id = "slot_" + props.slot + "_channel_" + props.channel + "_" + props.label;
    const [model, setModel] = useState(props.model);
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
        setModel(props.model);
    }, [props]);

    useEffect(() => {
        setChecked(model.set);
        inputRef.current.indeterminate = false;
    }, [model.set]);

    return (
        <div className="h-100 p-3">
            <div className="d-flex justify-content-between">
                <div>
                    <span>{props.label}: </span><span>{model.set ? "ON":"OFF"}</span>
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