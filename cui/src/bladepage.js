import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import ChannelGrid from './xchannel.js';

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
    return (
      <>
        <h1>{props.chassis}|{props.slot}: {bladeDate.model}</h1>
        {/* {JSON.stringify(bladeDate)} */}
        <ChannelGrid chassis={props.chassis} slot={props.slot} model={bladeDate.channels}/>
      </>
    );
  }
}

export default Bladepage;