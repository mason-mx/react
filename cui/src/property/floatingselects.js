import React, { useState, useEffect } from "react"

const SelectControl = (props) => {
    const [model, setModel] = useState(props.model);
    //const [curValue, setCurrentValue] = useState(model.set);

    const options = model.options.map((opt, index) =>
      <option value={opt} key={index}>{opt}</option>
    );

    useEffect(() => {
        setModel(props.model);
        //setCurrentValue(model.set);
    }, [props]);

    const onChange = (evt) => {
        props.onSubmit(evt.target.value);
    };

    return (
        <div className="form-floating">
            <select className="form-select" id={props.id} onChange={onChange} value={model.set}>
                {options}
            </select>
            <label htmlFor={props.id}>{props.label}</label>
        </div>
    )
}

export default SelectControl