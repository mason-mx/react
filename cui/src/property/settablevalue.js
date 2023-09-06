import React from "react"
import SwitchControl from "./onoff";
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const isBoolean = val => 'boolean' === typeof val;

const SettableControl = (props) => {
    //const id = "slot_" + props.slot + "_channel_" + props.channel + "_" + props.label;
    const model = props.model;
    try {
        if('set' in model)
        {
            if(isBoolean(model.set))
            {
                return (
                    <div className="h-100 p-2 d-flex align-items-center">
                        <SwitchControl label={props.label} model={model}/>
                    </div>
                )
            }
            if('options' in model)
            {
                const options = model.options.map((opt) =>
                    <option value={opt}>{opt}</option>
                );
                return (
                    <>
                        <FloatingLabel controlId="floatingSelectGrid" label={props.label + ": " + model.set}>
                            <Form.Select aria-label="Floating label select example">
                                <option>Open this select menu</option>
                                {options}
                            </Form.Select>
                        </FloatingLabel>
                    </>
                )
            }
            return (
                <>
                    <FloatingLabel controlId="floatingInputGrid" label={props.label + ": " + model.set + " " + model.unit}>
                        <Form.Control type="text"  placeholder={model.set} />
                    </FloatingLabel>
                </>
            )
        }
    } catch (error) {
        return (
            <>
                <span>{props.label}: </span><span>{JSON.stringify(model)}</span>
            </>
        )
    }
}

export default SettableControl