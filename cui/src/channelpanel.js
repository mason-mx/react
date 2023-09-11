import React from "react"
import "./controls.scss";
import PlainControl from './property/plainvalue.js';
import SettableControl from './property/settablevalue.js';

function populateSetProperty(slot, channel, key, value, index) {
    if('set' in value)
    {
        return (
            <li className="list-group-item" key={index}>
                <SettableControl slot={slot} channel={channel} label={key} model={value}/>
            </li>
        )
    }
    return;
}

function populateActProperty(slot, channel, key, value, index) {
    if('act' in value)
    {
        return (
            <li className="list-group-item bg-transparent" key={index}>
                <PlainControl slot={slot} channel={channel} label={key} model={value}/>
            </li>
        )
    }
    return;
}

const ChannelPanel = (props) => {
    const id = "slot_" + props.slot + "_channel_" + props.channel;
    const model = props.model;

    return (
        <div className="card" id={id}>
            <div className="card-header bg-info">
                <strong>CHANNEL {props.channel}</strong>
            </div>
            <div className="card-body">
                <ul className="list-group list-group-flush bg-secondary bg-gradient bg-opacity-50">
                    {Object.keys(model).map((key, index) => (
                        populateActProperty(props.slot, props.channel, key, model[key], index)
                    ))}
                </ul>
                <ul className="list-group list-group-flush">
                    {Object.keys(model).map((key, index) => (
                        populateSetProperty(props.slot, props.channel, key, model[key], index)
                    ))}
                </ul>
                {/* <form className="d-flex justify-content-end">
                    <button className="btn btn-primary" onClick={(e) => props.updatePopup(props.channel)}>Edit</button>
                </form> */}
            </div>
        </div>
    )
}

export default ChannelPanel