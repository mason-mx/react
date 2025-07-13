import React, { useState, useEffect } from "react"

const default_model = {
    options: [
        "OPT 1",
        "OPT 2",
        "OPT 3"
    ],
    set: "OPT 3"
};

const FSelectControl = (props) => {
    const [model, setModel] = useState(props.model === undefined ? default_model :  props.model);
    const [cur, setCur] = useState(model.set);
    const options = model.options.map((opt, index) =>
      <option value={opt} key={index}>{opt}</option>
    );

    useEffect(() => {
        setModel(props.model === undefined ? default_model :  props.model);
    }, [props.model]);

    useEffect(() => {
        setCur(model.set);
    }, [model.set]);

    const onChange = (evt) => {
        if(typeof props.onSubmit === 'function')
        {
            props.onSubmit(evt.target.value);
        } else {
            setCur(evt.target.value);
        }
    };

    return (
        <>
            <div className="form-floating">
                <select className="form-select" id={props.id} onChange={onChange} value={cur}>
                    {options}
                </select>
                <label htmlFor={props.id}>{props.label}</label>
            </div>
        </>
    )
}

export default FSelectControl