import React, { useState, useEffect } from 'react';
import PxiePage from './pxie';
import Bladepage from './bladepage';
import { ViewContext } from './viewcontext';
import Spinner from 'react-bootstrap/Spinner';

const { forwardRef, useImperativeHandle } = React;

const Instrument = forwardRef((props, ref) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [chassisData, setChassisData] = useState({});
  const [view, setView] = useState('home');
  const [platform, setPlatform] = useState('PXIE');
  const [slot, setSlot] = useState(1);
  const [chassis, setChassis] = useState(0);

  const clickBlade=(chassis, slot) => {
    setSlot(slot);
    setChassis(chassis);
    setView('blade');
  }

  useImperativeHandle(ref, () => ({
    clickHome() {
      setView('home');
    }
  }));

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("/instrument?depth=2")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setChassisData(result.chassis);
          setPlatform(result.platform);
          props.updateSidebar(
            {
              chassis_mode: result.chassis_mode,
              server_version: result.server_version,
              platform: result.platform
            }
          );
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
    if (platform === 'PXIE') {
      if (view === 'home') {
        return (
          <ViewContext.Provider value={{onChange: clickBlade}}>
            <PxiePage chassis={chassisData}/>
          </ViewContext.Provider>
        )
      } else if (view === 'blade') {
        return (
          <Bladepage chassis={chassis} slot={slot}/>
        )
      } else {
        return <h1>Current view is : {view}</h1>        
      }
    } else if (platform === 'MTRQ') {
      return (
        <Bladepage chassis={0} slot={0}/>
      )
    } else if (platform === 'EPIQ') {
      return <div>EPIQ</div>;
    } else {
      return <div>Unknown platform!</div>;
    }
  }
});

export default Instrument;