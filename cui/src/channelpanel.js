import React, { useEffect, useState, useRef } from "react"
import "./controls.scss";
import PlainControl from './property/plainvalue.js';
import SettableControl from './property/settablevalue.js';

import { useTranslation } from "react-i18next";
import {getData} from './fetch'

function populateSetProperty(chassis, slot, channel, label, key, value, index) {
    if('set' in value)
    {
        return (
            <div className="col-12 my-1 py-1 settable-property" key={index}>
                <SettableControl chassis={chassis} slot={slot} channel={channel} label={label} attr={key} model={value}/>
            </div>
        )
    }
    return;
}

function populateActProperty(chassis, slot, channel, label, key, value, index) {
    if('act' in value)
    {
        return (
            <div className="col-12 my-1" key={index}>
                <PlainControl chassis={chassis} slot={slot} channel={channel} label={label} attr={key} model={value}/>
            </div>
        )
    }
    return;
}

const ChannelPanel = (props) => {
    const id = "slot_" + props.slot + "_channel_" + props.channel;
    const url = "/instrument/chassis" +  + props.chassis + "/blade" + props.slot + "/channel" + props.channel;
    const timerIdRef = useRef(null);
    const [isPollingEnabled, setIsPollingEnabled] = useState(true);
    const [model, setModel] = useState(props.model);

    const { t } = useTranslation();

    const onFetchSuccess = (result) => {
        setModel(result);
    };

    const onFetchFailure = (error) => {
    };

    useEffect(() => {
        const pollingCallback = () => {
          getData(url, onFetchSuccess, onFetchFailure);
    
          // Simulating an API failure in the polling callback
        //   const shouldFail = Math.random() < 0.2; // Simulate 20% chance of API failure
    
        //   if (shouldFail) {
        //     setIsPollingEnabled(false);
        //     console.log('Polling failed. Stopped polling.');
        //   }
        };
    
        const startPolling = () => {
          timerIdRef.current = setInterval(pollingCallback, 1000);
        };
    
        const stopPolling = () => {
            console.log('Stop Polling...');
            clearInterval(timerIdRef.current);
        };
    
        if (isPollingEnabled) {
            startPolling();
        } else {
            stopPolling();
        }
    
        return () => {
            stopPolling();
        };
    }, [isPollingEnabled]);

    return (
        <div className="card" id={id}>
            <div className="card-header bg-info">
                <strong>CHANNEL {props.channel}</strong>
            </div>
            <div className="card-body">
                <div className="row bg-secondary bg-gradient bg-opacity-50">
                    {Object.keys(model).map((key, index) => (
                        populateActProperty(props.chassis, props.slot, props.channel, t(key), key, model[key], index)
                    ))}
                </div>
                <div className="row">
                    {Object.keys(model).map((key, index) => (
                        populateSetProperty(props.chassis, props.slot, props.channel, t(key), key, model[key], index)
                    ))}
                </div>
                {/* <form className="d-flex justify-content-end">
                    <button className="btn btn-primary" onClick={(e) => props.updatePopup(props.channel)}>Edit</button>
                </form> */}
            </div>
        </div>
    )
}

export default ChannelPanel