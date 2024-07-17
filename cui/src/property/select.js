import React, { useState, useEffect } from "react"

const SelectControl = (props) => {
    const [model, setModel] = useState(props.model);

    const options = model.options.map((opt, index) =>
      <option value={opt} key={index}>{opt}</option>
    );

    useEffect(() => {
        setModel(props.model);
    }, [props]);

    const onChange = (evt) => {
        if(typeof props.onSubmit === 'function')
        {
            props.onSubmit(evt.target.value);
        }
    };

    return (
        <select className="form-select" id={props.id} onChange={onChange} value={model.set}>
            {options}
        </select>
    )
}

export default SelectControl