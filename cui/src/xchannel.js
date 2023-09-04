import React from "react"
import "./controls.scss";
import ChannelPanel from './channelpanel.js'

const ChannelGrid = (props) => {
    const id = "slot_" + props.slot + "_channel_" + props.channel;
    const model = props.model;
    var channels = [];
    for (var i = 0; i < model.length; i++)
    {
      channels.push(
        <div className='col-12 col-md-6' key={i}><ChannelPanel slot={props.slot} channel={i+1} model={model[i]}/></div>
      );
    }
    return (
        <>{channels}</>
    )
}

export default ChannelGrid