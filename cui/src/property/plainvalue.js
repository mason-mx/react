import React from "react"

const isBoolean = val => 'boolean' === typeof val;

const PlainControl = (props) => {
    const id = "slot_" + props.slot + "_channel_" + props.channel + "_" + props.attr;
    const model = props.model;
    try {
        if('act' in model && 'set' in model)
        {
            return (
                <>
                    <span>{props.label}: </span><span id={id + "_act"}>{model.act}</span><span> </span><span>{model.unit}</span>
                    <span> | </span><span id={id + "_set"}>{model.set}</span><span> </span><span>{model.unit}</span>
                </>
            )
        }
        if('act' in model && !('set' in model))
        {
            return (
                <>
                    <span>{props.label}: </span><span id={id + "_act"}>{model.act}</span><span> </span><span>{model.unit}</span>
                </>
            )
        }
        if('set' in model)
        {
            if(isBoolean(model.set))
            {
                return (
                    <>
                        <span>{props.label}: </span><span id={id + "_set"}>{model.set ? "ON": "OFF"}</span>
                    </>
                )
            }
            return (
                <>
                    <span>{props.label}: </span><span id={id + "_set"}>{model.set}</span><span> </span><span>{model.unit}</span>
                </>
            )
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

export default PlainControl