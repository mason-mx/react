import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import ChannelGrid from './xchannel';
import NxNSwitch from './templates/nxnswitch';

function Bladepage(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [bladeDate, setBladeDate] = useState({});

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("/instrument/chassis" + props.chassis + "/blade" + props.slot)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setBladeDate(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [props])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return (
      <>
        <Spinner animation="grow" variant="danger"  size="sm" />
        <Spinner animation="grow" variant="warning"  size="sm" />
        <Spinner animation="grow" variant="info"  size="sm" />
      </>);
  } else {
    if("switch_type" in bladeDate)
    {
      try {
        if("NxN" === bladeDate.channels[0].state.device_type)
        {
          return (
            <NxNSwitch chassis={props.chassis} slot={props.slot} title={bladeDate.model} model={bladeDate.channels} />
          );
        }
      } catch (error) {
        return (
          <>
            <h1>{props.chassis}|{props.slot}: {bladeDate.model}</h1>
          </>
        );
      }
    } else if (bladeDate.model.includes("BERT-1102") || bladeDate.model.includes("OSA")) {
      return (
        <>
          <p>{JSON.stringify(bladeDate)}</p>
        </>
      );
    } else {
      return (
        <ChannelGrid chassis={props.chassis} slot={props.slot} title={bladeDate.model} model={bladeDate.channels}/>
      );
    }
  }
}

export default Bladepage;