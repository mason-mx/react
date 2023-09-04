import React from "react"
import "./controls.scss";
import PlainControl from './property/plainvalue.js';

function populateProperty(slot, channel, key, value) {
    return <PlainControl slot={slot} channel={channel} label={key} model={value}/>;
}

const ChannelPanel = (props) => {
    const id = "slot_" + props.slot + "_channel_" + props.channel;
    const model = props.model;
    return (
        <div className="card" id={id}>
            <div className="card-header">
                <strong>CHANNEL {props.channel}</strong>
            </div>
            <ul className="list-group list-group-flush">
                {Object.keys(model).map((key, index) => (
                    <li className="list-group-item" key={index}>
                        {populateProperty(props.slot, props.channel, key, model[key])}
                    </li>
                ))}
            </ul>
            <div className="card-body">
                <form className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary">Edit</button>
                </form>
            </div>
        </div>
    )
}

export default ChannelPanel