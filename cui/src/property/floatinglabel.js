import React, { useState, useEffect } from "react"
import { getStepsizebyValues } from "../util"

import { ArrowLeftRight, PlusLg, DashLg } from 'react-bootstrap-icons';

const default_model = {
    set: 1,
    min: -5,
    max: 10,
    step: 0.01,
    unit: 'U'
};

const FInputControl = (props) => {
    const [model, setModel] = useState(props.model === undefined ? default_model :  props.model);
    var display = model.unit === undefined ? model.set : model.set + " " + model.unit;
    const [value, setValue] = useState(display);
    const [unit, setUnit] = useState(model.unit);
    const [curValue, setCurrentValue] = useState(model.set);
    const [valid, setValid] = useState("form-control");
    const [label, setLabel] = useState(props.label);
    const [onEdit, setOnEdit] = useState(false);

    const step = ((model.step === undefined) ? getStepsizebyValues(model.min, model.max, model.set) : model.step);
    const accept2submit = (typeof props.onSubmit === 'function');

    useEffect(() => {
        if(!onEdit)
        {
            display = model.unit === undefined ? model.set : model.set + " " + model.unit;
            setValue(display);
            setValid("form-control");
        }
        setCurrentValue(model.set);
    }, [model.set, model.unit, onEdit]);

    useEffect(() => {
        setModel(props.model === undefined ? default_model :  props.model);
    }, [props.model]);

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
        setLabel(props.label + ": " + display);
    };
    const handleSubmit = (evt) => {
        evt.preventDefault();
    };
    const handleKeyDown = (evt) => {
        if (evt.key === 'Enter') {
            if(valid === 'form-control') {
                if(typeof props.onSubmit === 'function')
                {
                    props.onSubmit(value);
                    setLabel(props.label);
                } else {
                    display = model.unit === undefined ? value : value + " " + model.unit;
                    setValue(display);
                    setCurrentValue(value);
                }
                setOnEdit(false);
            }
        }
    };
    const onInputBlur = (evt) => {
        if(evt.target.value === "")
        {
            setValue(display);
            setValid("form-control");
            setLabel(props.label);
        }
        setOnEdit(false);
    };

    const onSet = (value) => {
        if(typeof props.onSubmit === 'function')
        {
            props.onSubmit(value);
            setLabel(props.label);
        }
        setOnEdit(false);
    };

    const onConvert = (unit) => {
        display = "New value in new unit";
        setValue(display);
    };

    return (
        <div className={model.readonly ? "row readonly": "row"}>
            <div className="col-12 mb-1 mb-lg-0">
                <div className="input-group">
                    <form className="form-floating" onSubmit={handleSubmit}>
                        <input type="text" className={valid} id={props.id} placeholder="abc" value={value} onChange={onInputChange} onKeyDown={handleKeyDown}/*onBlur={onInputBlur}*//>
                        <label htmlFor={props.id}>{label}</label>
                    </form>
                    {
                        // accept2submit ? <button className="btn btn-outline-secondary" type="button" onClick={() => {onSet(value)}}>Set</button> : null
                    }
                    <button className="btn btn-outline-secondary" type="button" onClick={() => {onSet(parseFloat(curValue + step))}}><PlusLg/></button>
                    <button className="btn btn-outline-secondary" type="button" onClick={() => {onSet(parseFloat(curValue - step))}}><DashLg/></button>
                    {
                        (unit === 'dBm' || unit === 'mW') ?
                            <button className="btn btn-outline-secondary" type="button" onClick={() => {onConvert(unit)}}><ArrowLeftRight/></button>
                        : null
                    }
                </div>
            </div>
        </div>
    )
}

export default FInputControl