import React, { useRef } from "react";
import "./controls.scss";
import ChannelPanel from './channelpanel.js'
import AdjustPanel from './adjustpanel.js'

const ChannelGrid = (props) => {
    //const id = "slot_" + props.slot + "_channel_" + props.channel;
    const model = props.model;

    const adjust_comp = useRef(null);

    var channels = [];
    for (var i = 0; i < model.length; i++)
    {
      channels.push(
        <div className='col-12 col-md-6' key={i}>
          <ChannelPanel slot={props.slot} channel={i+1} model={model[i]} updatePopup={(channelNumber) => {
            adjust_comp.current.fillChannel(channelNumber);
          }}/>
        </div>
      );
    }
    return (
        <>
          <div className='row mb-2'>
            <form className="d-flex justify-content-end">
              <button className="btn btn-primary" onClick={(e) => adjust_comp.current.fillChannel(0)}>Edit</button>
            </form>
          </div>
          <div className='row'>
            {channels}
          </div>
          <AdjustPanel slot={props.slot} ref={adjust_comp} model={model[0]}/>
        </>
    )
}

export default ChannelGrid