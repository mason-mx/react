import React, { useEffect, useState, useRef } from "react"

import { useTranslation } from "react-i18next";
import {getData, putData} from '../fetch'

import "../controls.scss";
import { XCircle } from 'react-bootstrap-icons';

const NxNSwitch = (props) => {
    //const id = "slot_" + props.slot + "_channel_" + props.channel;
    const url = "/instrument/chassis" +  + props.chassis + "/blade" + props.slot + "/channel1";
    const timerIdRef = useRef(null);
    const { t } = useTranslation();

    const [model, setModel] = useState(props.model);
    const [input, setInput] = useState(0);
    const [output, setOutput] = useState(0);

    const onInputClick = (evt) => {
        setInput(parseInt(evt.target.innerText));
    };

    const onOutputClick = (evt) => {
        setOutput(parseInt(evt.target.innerText));
    };

    const onPutSuccess = (result) => {
        setInput(0);
        setOutput(0);
    };

    const onPutFailure = (error) => {
        setInput(0);
        setOutput(0);
    };

    const onConnect = () => {
        putData(url + '/state', {set: input + ',' + output}, onPutSuccess, onPutFailure);
    };

    const onDisconnect = (input) => {
        putData(url + '/state', {set: input + ',0'}, onPutSuccess, onPutFailure);
    };

    const onDisconnectAll = () => {
        putData(url + '/park', {set: "ALL"}, onPutSuccess, onPutFailure);
    };

    var inputs = model.state.inputs;
    var outputs = model.state.outputs;
    var connections = 0;
    inputs.forEach((item) => {
        if(item.linked_to > 0) { connections ++ }
    });

    const setupTimeouts = () => {
        timerIdRef.current = setTimeout(() => {
            getData(url, onFetchSuccess, onFetchFailure);
        }, 1000);
    };

    const onFetchSuccess = (result) => {
        setModel(result);
        //setupTimeouts();
    };

    const onFetchFailure = (error) => {
        clearTimeout(timerIdRef.current);
    };

    useEffect(() => {
        setupTimeouts();
        return () => {
            clearTimeout(timerIdRef.current);
        };
    });

    return (
        <>
            <div className='row'>
                <h3>{props.title}</h3>
            </div>
            <div className="row">
                <div className="switch-main-title" align="center"><h5>{t("add_connections")}</h5></div>
                <div className="row m-0">
                    <div className="col-4">
                        <button type="button" className="col-12 btn btn-block btn-lg btn-outline-secondary" disabled>{input > 0 ? input : t("pick_one_input_from_below")}</button>
                    </div>
                    <div className="col-4">
                        <button type="button" className="col-12 btn btn-block btn-lg btn-primary" disabled={input === 0 || output === 0} onClick={onConnect}>{t("connect")}</button>
                    </div>
                    <div className="col-4">
                        <button type="button" className="col-12 btn btn-block btn-lg btn-outline-secondary" disabled>{output > 0 ? output :t("pick_one_output_from_below")}</button>
                    </div>
                </div>
            </div>
            <div className="row m-3">
                <hr />
            </div>
            <div className="row">
                <div className="col-4" align="center">{t("inputs")}</div>
                <div className="col-4" align="center">{t("connections")}</div>
                <div className="col-4" align="center">{t("outputs")}</div>
            </div>
            <div className="row">
                <div className="col-4">
                    {inputs.map((item, index) =>
                        (item.linked_to === 0 && item.switch !== input) ?
                        <div className="col-12 btn btn-outline-secondary mb-1" key={index} id={"input" + (index + 1)} onClick={onInputClick}>{index + 1}</div>
                        : null
                    )}
                </div>
                <div className="col-4">
                    {
                        inputs.map((item, index) => (
                            item.linked_to > 0 ?
                            <button type="button" className='col-12 btn btn-outline-success mb-1 hover-button' key={index} attr={index + 1} id={"connection" + (index + 1)} onClick={() => {onDisconnect(index + 1)}}>
                                {index + 1}---{item.linked_to} <XCircle className="mb-1"/>
                            </button>
                            : null
                        ))
                    }
                    {connections > 1 &&
                        <button type="button" className="col-12 btn btn-outline-danger" onClick={onDisconnectAll}>{t("park_all")}</button>
                    }
                </div>
                <div className="col-4">
                    {outputs.map((item, index) =>
                        (item.linked_to === 0 && item.switch !== output) ?
                        <div className="col-12 btn btn-outline-secondary mb-1" key={index} id={"output" + (index + 1)} onClick={onOutputClick}>{index + 1}</div>
                        : null
                    )}
                </div>
            </div>
        </>
    )
}

export default NxNSwitch