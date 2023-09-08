import React from "react"
import SwitchControl from "./onoff";
import InputControl from './floatinglabel';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const isBoolean = val => 'boolean' === typeof val;

const SettableControl = (props) => {
    const id = "slot_" + props.slot + "_channel_" + props.channel + "_" + props.label;
    const model = props.model;
    try {
        if(isBoolean(model.set))
        {
            return <SwitchControl label={props.label} model={model}/>;
        }
        if('options' in model)
        {
            const options = model.options.map((opt, index) =>
                <option value={opt} key={index}>{opt}</option>
            );
            return (
                <FloatingLabel controlId="floatingSelectGrid" label={props.label}>
                    <Form.Select id={id} defaultValue={model.set}>
                        {options}
                    </Form.Select>
                </FloatingLabel>
            )
        }
        return <InputControl label={props.label} model={model}/>;
    } catch (error) {
        return (
            <>
                <span>{props.label}: </span><span>{JSON.stringify(model)}</span>
            </>
        )
    }
}

export default SettableControl