import React, { useEffect, useState, useRef } from "react"

import { useTranslation } from "react-i18next";
import {getData} from '../fetch'

const NxNSwitch = (props) => {
    const id = "slot_" + props.slot + "_channel_" + props.channel;
    const url = "/instrument/chassis" +  + props.chassis + "/blade" + props.slot + "/channel1";
    const timerIdRef = useRef(null);
    const [isPollingEnabled, setIsPollingEnabled] = useState(true);
    const [model, setModel] = useState(props.model);

    const [input, setInput] = useState(0);
    const [output, setOutput] = useState(0);

    const onInputClick = (evt) => {
        setInput(parseInt(evt.target.innerText));
    };

    const onOutputClick = (evt) => {
        setOutput(parseInt(evt.target.innerText));
    };

    var inputs = model.state.inputs;

    const { t } = useTranslation();

    const onFetchSuccess = (result) => {
        setModel(result);
    };

    const onFetchFailure = (error) => {
        setIsPollingEnabled(false);
    };

    useEffect(() => {
        const pollingCallback = () => {
          getData(url, onFetchSuccess, onFetchFailure);
        };

        const startPolling = () => {
          timerIdRef.current = setInterval(pollingCallback, 5000);
        };
    
        const stopPolling = () => {
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
    }, [url, isPollingEnabled]);

    return (
        <>
            <div className='row'>
                <h3>{props.title}</h3>
            </div>
            <div className="row">
                <div className="switch-main-title" align="center"><h5>{t("add_connections")}</h5></div>
                <div className="row">
                    <div className="col-4 port-selection-container">
                        <button type="button" className="col-12 btn btn-block btn-lg btn-outline-secondary" disabled>{input > 0 ? input : t("pick_one_input_from_below")}</button>
                    </div>
                    <div className="col-4">
                        <div className="col-12 btn btn-block btn-lg btn-primary button-large" disabled="disabled">{t("connect")}</div>
                    </div>
                    <div className="col-4 port-selection-container">
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
                <div className="col-4 btn-group-vertical">
                    {inputs.map((item, index) =>
                        <div className={(item.linked_to > 0 || item.switch === input) ? 'd-none' : "btn btn-outline-secondary"} id={"input" + (index + 1)} key={index} onClick={onInputClick}>{index + 1}</div>
                    )}
                </div>
                <div className="col-4">
                    {inputs.map((item, index) =>
                        <div className="row" key={index}><div className={item.linked_to > 0 ? 'btn btn-outline-success' : "d-none"} id={"input" + (index + 1)}>{index + 1}---{item.linked_to}</div></div>
                    )}
                    <div className="row"><div className="btn btn-outline-danger" id="parkall">{t("park_all")}</div></div>
                </div>
                <div className="col-4 btn-group-vertical">
                    {inputs.map((item, index) =>
                        <div className={(item.linked_to > 0 || item.switch === output) ? 'd-none' : "btn btn-outline-secondary"} id={"output" + (index + 1)} key={index} onClick={onOutputClick}>{index + 1}</div>
                    )}
                </div>
            </div>
        </>
    )
}

export default NxNSwitch