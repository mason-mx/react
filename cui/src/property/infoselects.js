import React, { useState, useEffect } from "react"

const default_model = {
    info: [
        "0:PRBS7",
        "1:PRBS15",
        "2:PRBS31"
    ],
    set: 1
};

const ISelectControl = (props) => {
    const [model, setModel] = useState(props.model === undefined ? default_model :  props.model);

    const options = model.info.map((opt, index) => {
            var dic = opt.split(':');
            return <option value={dic[0]} key={index}>{dic[1]}</option>
        }
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

export default ISelectControl