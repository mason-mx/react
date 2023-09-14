import React, { useEffect, useState, useRef } from "react"

import { useTranslation } from "react-i18next";
import {getData} from '../fetch'

const NxNSwitch = (props) => {
    const id = "slot_" + props.slot + "_channel_" + props.channel;
    const url = "/instrument/chassis" +  + props.chassis + "/blade" + props.slot + "/channel" + props.channel;
    const timerIdRef = useRef(null);
    const [isPollingEnabled, setIsPollingEnabled] = useState(true);
    const [model, setModel] = useState(props.model);

    var input = model[0].state.inputs;

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
                <div className="w-100 pl-2 pr-2">
                    <div className="col-12">
                        <div className="switch-main-title"><h3>ADD CONNECTIONS</h3></div>
                        <div className="row">
                            <div className="col-md-4 col-sm-3 port-selection-container"></div>
                            <div className="col-md-4 col-sm-6">
                                <div className="col-12 btn btn-block btn-lg btn-primary button-large" disabled="disabled">CONNECT</div>
                            </div>
                            <div className="col-md-4 col-sm-3 port-selection-container"></div>
                        </div>
                    </div>
                    <div className="col-12">
                        <hr className="hr" />
                    </div>
                    <div className="row w-100 m-0">
                        <div className="col-md-4 col-sm-3 switch-header" align="center">INPUTS</div>
                        <div className="col-md-4 col-sm-6 switch-header" align="center">CONNECTED</div>
                        <div className="col-md-4 col-sm-3 switch-header" align="center">OUTPUTS</div>
                    </div>
                    <div className="row w-100 m-0">
                        <div className="col-md-4 col-sm-3 switch-container-left">
                            {input.map((item, index) =>
                                <div className={item.linked_to > 0 ? 'd-none btn btn-lg btn-block btn-primary' : "btn btn-lg btn-block btn-primary"} id={"input" + (index + 1)}>{index + 1}</div>
                            )}
                        </div>
                        <div className="col-md-4 col-sm-6">
                            <div className="switch-connect">
                                {input.map((item, index) =>
                                    <div className={item.linked_to > 0 ? 'btn btn-lg btn-block btn-primary' : "d-none btn btn-lg btn-block btn-primary"} id={"input" + (index + 1)}>{index + 1}---{item.linked_to}</div>
                                )}                                
                                <span className="btn-danger btn btn-lg btn-block" id="parkall">PARK ALL</span>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-3 switch-container-right">
                            {input.map((item, index) =>
                                <div className={item.linked_to > 0 ? 'd-none btn btn-lg btn-block btn-primary' : "btn btn-lg btn-block btn-primary"} id={"output" + (index + 1)}>{index + 1}</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NxNSwitch