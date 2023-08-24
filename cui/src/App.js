import './App.css';
import React, { useRef } from "react";
import CNavbar from './navbar';
import CFooter from './footer';
import Instrument from './instrument';
import SystemSetting from './systemsetting';

function App() {
  const instr_comp = useRef(null);
  const sysset_comp = useRef(null);
  return (
    <>
      <CNavbar callHome={() => {
          instr_comp.current.clickHome();
        }}
        callSystemSet={() => {
          sysset_comp.current.clickMe();
        }}/>
      <Instrument ref={instr_comp}/>
      <SystemSetting ref={sysset_comp}/>
      <CFooter />
    </>
  );
}

export default App;
