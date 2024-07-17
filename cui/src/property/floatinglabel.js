import React, { useState, useEffect } from "react"
import { getStepsizebyValues } from "../util"

const FInputControl = (props) => {
    const [model, setModel] = useState(props.model);
    const display = model.unit === undefined ? model.set : model.set + " " + model.unit;
    const [value, setValue] = useState(display);
    const [curValue, setCurrentValue] = useState(model.set);
    const [valid, setValid] = useState("form-control");
    const [label, setLabel] = useState(props.label);
    const [onEdit, setOnEdit] = useState(false);

    const step = getStepsizebyValues(model.min, model.max, model.set);

    useEffect(() => {
        if(!onEdit)
        {
            setModel(props.model);
            var display = model.unit === undefined ? model.set : model.set + " " + model.unit;
            setValue(display);
            setCurrentValue(model.set);
            setLabel(props.label);
            setValid("form-control");
        }
    }, [props, model.set, model.unit, onEdit]);

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
        }
        setOnEdit(false);
    };

    return (
        <div className={model.readonly ? "row readonly": "row"}>
            <div className="col-12 col-lg-6 mb-1 mb-lg-0">
                <div className="input-group">
                    <form className="form-floating">
                        <input type="text" className={valid} id={props.id} placeholder={display} value={value} onChange={onInputChange} /*onBlur={onInputBlur}*//>
                        <label htmlFor={props.id}>{label}</label>
                    </form>
                    <button className="btn btn-outline-secondary" type="button" onClick={() => {onSet(parseFloat(value))}}>Set</button>
                </div>
            </div>
            <div className="col-12 col-lg-6 btn-group" role="group">
                <button className="btn btn-outline-secondary" type="button" onClick={() => {onSet(parseFloat(curValue + step))}}>+</button>
                <button className="btn btn-outline-secondary" type="button" onClick={() => {onSet(parseFloat(curValue - step))}}>-</button>
                <button className="btn btn-outline-secondary" type="button" onClick={() => {onSet("min")}}>Min</button>
                <button className="btn btn-outline-secondary" type="button" onClick={() => {onSet("max")}}>Max</button>
            </div>
        </div>
    )
}

export default FInputControl