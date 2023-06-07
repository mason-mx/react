import React, { useState, useEffect } from 'react';
import PxiePage from './pxie';
import Bladepage from './bladepage';
import CMainFrame from './mainframe';
import { ViewContext } from './viewcontext';

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
    console.log(chassis, slot);
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
    fetch("http://localhost/instrument")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setChassisData(result.chassis);
          setPlatform(result.platform);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    if (platform === 'PXIE') {
      if (view === 'home') {
        return (
          <CMainFrame>
            <ViewContext.Provider value={{onChange: clickBlade}}>
              <PxiePage chassis={chassisData}/>
            </ViewContext.Provider>
          </CMainFrame>
        )
      } else if (view === 'blade') {
        return (
          <CMainFrame>
            <Bladepage chassis={chassis} slot={slot}/>
          </CMainFrame>
        )
      } else {
        return <h1>Current view is : {view}</h1>        
      }
    } else if (platform === 'MTRQ') {
      return (
        <CMainFrame>
          <Bladepage chassis={0} slot={0}/>
        </CMainFrame>
      )
    } else if (platform === 'EPIQ') {
      return <div>EPIQ</div>;
    } else {
      return <div>Unknown platform!</div>;
    }
  }
});

export default Instrument;