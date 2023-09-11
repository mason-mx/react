import React, { useState, useEffect } from "react"

const InputControl = (props) => {
    const [model, setModel] = useState(props.model);
    const display = model.unit === undefined ? model.set : model.set + " " + model.unit;
    const [value, setValue] = useState(display);
    const [valid, setValid] = useState("form-control");
    const [label, setLabel] = useState(props.label);
    const [onedit, setOnEdit] = useState(false);

    useEffect(() => {
        if(!onedit)
        {
            setModel(props.model);
            var display = model.unit === undefined ? model.set : model.set + " " + model.unit;
            setValue(display);
            setLabel(props.label);
            setValid("form-control");
        }
    }, [props]);

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

    return (
        <div className="row">
            <div className="col-12 col-lg-6 mb-1 mb-lg-0">
                <div className="input-group">
                    <form className="form-floating">
                        <input type="text" className={valid} id={props.id} placeholder={display} value={value} onChange={onInputChange} onBlur={onInputBlur}/>
                        <label htmlFor={props.id}>{label}</label>
                    </form>
                    <button className="btn btn-outline-secondary" type="button">Set</button>
                </div>
            </div>
            <div className="col-12 col-lg-6 btn-group" role="group">
                <button className="btn btn-outline-secondary" type="button">+</button>
                <button className="btn btn-outline-secondary" type="button">-</button>
                <button className="btn btn-outline-secondary" type="button">Min</button>
                <button className="btn btn-outline-secondary" type="button">Max</button>
            </div>
        </div>
    )
}

export default InputControl