import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import ChannelGrid from './xchannel';
import NxNSwitch from './templates/nxnswitch';
import POL1201 from './templates/pol1201';
import PAM4 from './templates/pam4';

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
        if("NxN" === bladeDate.channels[0].switches.device_type)
        {
          return (
            <NxNSwitch chassis={props.chassis} slot={props.slot} model={bladeDate.channels[0]} />
          );
        } else if("1xN" === bladeDate.channels[0].switches.device_type)
        {
          return (
            <>1xn</>
          );
        }
      } catch (error) {
        return (
          <>
            405
          </>
        );
      }
    } else if (bladeDate.model.includes("BERT-1102")) {
      return (
        <p>{JSON.stringify(bladeDate)}</p>
      );
    } else if (bladeDate.model.includes("OSA")) {
      return (
        <PAM4 chassis={props.chassis} slot={props.slot} model={bladeDate.channels[0]} />
      );
    } else if (bladeDate.model.includes("POL-1201")) {
      return (
        <POL1201 chassis={props.chassis} slot={props.slot} model={bladeDate.channels[0]} />
      );
    } else {
      return (
        <ChannelGrid chassis={props.chassis} slot={props.slot} model={bladeDate.channels}/>
      );
    }
  }
}

export default Bladepage;