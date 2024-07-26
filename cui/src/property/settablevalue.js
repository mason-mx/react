import React from "react"
import SwitchControl from "./onoff";
import FInputControl from './floatinglabel';
import ISelectControl from './infoselects';
import FSelectControl from './floatingselects';
import LedControl from './statusled';

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
            return <SwitchControl label={props.label} id={id} model={model} onSubmit={onSubmit}/>;
        }
        if('options' in model)
        {
            return <FSelectControl label={props.label} id={id} model={model} onSubmit={onSubmit}/>;
        }
        if('info' in model)
        {
            return <ISelectControl label={props.label} id={id} model={model} onSubmit={onSubmit}/>;
        }
        if('min' in model && 'max' in model && 'set' in model)
        {
            return <FInputControl label={props.label} id={id} model={model} onSubmit={onSubmit}/>;
        }
        if('set' in model)
        {
            return <LedControl label={props.label} id={id} model={model}/>;
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