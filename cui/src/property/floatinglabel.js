import React, { useState } from "react"

const InputControl = (props) => {
    const id = "slot_" + props.slot + "_channel_" + props.channel + "_" + props.label;
    const model = props.model;
    const display = model.unit === undefined ? model.set : model.set + " " + model.unit;
    const [value, setValue] = useState(display);
    const [valid, setValid] = useState("form-control");
    const [label, setLabel] = useState(props.label);
    const onInputChange = (evt) => {
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
    };

    return (
        <div class="input-group">
            <form className="form-floating">
                <input type="text" className={valid} id={id} placeholder={display} value={value} onChange={onInputChange} onBlur={onInputBlur}/>
                <label htmlFor={id}>{label}</label>
            </form>
            <button className="btn btn-outline-secondary" type="button">+</button>
            <button className="btn btn-outline-secondary" type="button">-</button>
            <button className="btn btn-outline-secondary" type="button">Min</button>
            <button className="btn btn-outline-secondary" type="button">Max</button>
            <button className="btn btn-outline-secondary" type="button">CUI-4</button>
        </div>  
    )
}

export default InputControl