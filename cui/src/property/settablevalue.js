import React from "react"
import SwitchControl from "./onoff";
import InputControl from './floatinglabel';
import SelectControl from './floatingselects';

import {putData} from '../fetch'

const isBoolean = val => 'boolean' === typeof val;

const SettableControl = (props) => {
    const id = "slot_" + props.slot + "_channel_" + props.channel + "_" + props.attr;
    const url = "/instrument/chassis" +  + props.chassis + "/blade" + props.slot + "/channel" + props.channel + "/" + props.attr;
    const model = props.model;

    const onPutSuccess = (result) => {
    };

    const onPutFailure = (error) => {
    };

    const onSubmit = (value) => {
        putData(url, {set:value}, onPutSuccess, onPutFailure);
    };
    try {
        if(isBoolean(model.set))
        {
            return <SwitchControl label={props.label} model={model} onSubmit={onSubmit}/>;
        }
        if('options' in model)
        {
            return <SelectControl label={props.label} id={id} model={model} onSubmit={onSubmit}/>;
        }
        if('min' in model && 'max' in model)
        {
            return <InputControl label={props.label} id={id} model={model} onSubmit={onSubmit}/>;
        }
        return (
            <>
                <span>{props.label}: </span><span>{JSON.stringify(model)}</span>
            </>
        )
    } catch (error) {
        return (
            <>
                <span>{props.label}: </span><span>{JSON.stringify(model)}</span>
            </>
        )
    }
}

export default SettableControl