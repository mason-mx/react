import React, { useState, useEffect } from "react"
import { getStepsizebyValues } from "../util"

import { CheckLg, XLg } from 'react-bootstrap-icons';

const InputGroupControl = (props) => {
    const [model, setModel] = useState(props.model);
    const [display, setDisplay] = useState(model.set);
    const [value, setValue] = useState("");
    const [valid, setValid] = useState("form-control");
    const [onEdit, setOnEdit] = useState(false);

    const step = getStepsizebyValues(model.min, model.max, model.set);

    // useEffect(() => {
    //     if(!onEdit)
    //     {
    //         setModel(props.model);
    //         var display = model.set;
    //         setValue(display);
    //         setValid("form-control");
    //     }
    // }, [props, model.set, onEdit]);

    const onInputChange = (evt) => {
        setOnEdit(true);
        var input = evt.target.value;
        if(isNaN(input))
        {
            if(input === "min" || input === "max" || input === "def"
                || input === "MIN" || input === "MAX" || input === "DEF")
            {
                setValid("form-control");
            } else {
                setValid("form-control is-invalid");
            }
        } else {
            var numeric = parseFloat(input);
            if(numeric > model.max || numeric < model.min)
            {
                setValid("form-control is-invalid");
            } else {
                setValid("form-control");
            }
        }
        setValue(evt.target.value);
    };
    const onInputBlur = (evt) => {
        if(evt.target.value === "")
        {
            setValue(display);
            setValid("form-control");
        }
        setOnEdit(false);
    };

    const onSet = (value) => {
        if(typeof props.onSubmit === 'function')
        {
            props.onSubmit(value);
        }
        setValue("");
        setValid("form-control");
        setOnEdit(false);
    };

    const onCancel = () => {
        setValue("");
        setValid("form-control");
        setOnEdit(false);
    };

    return (
        <div className={model.readonly ? "row readonly": "row"}>
            <div className="input-group">
                <button className="btn btn-outline-secondary" style={(onEdit) ? {} : {display: 'none'}} onClick={() => {onSet(parseFloat(value))}}>
                    <CheckLg/>
                </button>
                <button className="btn btn-outline-secondary" style={(onEdit) ? {} : {display: 'none'}} onClick={() => {onCancel()}}>
                    <XLg/>
                </button>
                <span className="input-group-text">{props.label}</span>
                <input type="text" className={valid} id={props.id} placeholder={display} value={value} onChange={onInputChange} />
                <span className="input-group-text">{model.unit}</span>
            </div>
        </div>
    )
}

export default InputGroupControl