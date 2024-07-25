import React, { useState, useEffect } from "react"

const default_model = {
    options: [
        "OFFSET",
        "ABSOLUTE",
        "RELATIVE"
    ],
    set: "ABSOLUTE"
};

const FSelectControl = (props) => {
    const [model, setModel] = useState(props.model === undefined ? default_model :  props.model);

    const options = model.options.map((opt, index) =>
      <option value={opt} key={index}>{opt}</option>
    );

    useEffect(() => {
        setModel(props.model === undefined ? default_model :  props.model);
    }, [props.model]);

    const onChange = (evt) => {
        if(typeof props.onSubmit === 'function')
        {
            props.onSubmit(evt.target.value);
        }
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

export default FSelectControl