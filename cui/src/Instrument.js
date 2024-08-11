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
  const [chassisIndex, setChassisIndex] = useState(0);

  const clickBlade=(chassisIndex, chassis, slot) => {
    setSlot(slot);
    setChassis(chassis);
    setChassisIndex(chassisIndex);
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
          <>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
              <li className="breadcrumb-item">Chassis{chassis}</li>
              <li className="breadcrumb-item active">Slot{slot}:<strong>{chassisData[chassisIndex].blades[slot].model}</strong></li>
              </ol>
            </nav>
            <Bladepage chassis={chassis} slot={slot}/>
          </>
        )
      } else {
        return <h1>Current view is : {view}</h1>
      }
    } else if (platform === 'MTRQ') {
      return (
        <>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
            <li className="breadcrumb-item active"><strong>{chassisData[0].blades[1].model}</strong></li>
            </ol>
          </nav>
          <Bladepage chassis={0} slot={1}/>
        </>
      )
    } else if (platform === 'EPIQ') {
      return <div>EPIQ</div>;
    } else {
      return <div>Unknown platform!</div>;
    }
  }
});

export default Instrument;