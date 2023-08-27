import './App.css';
import React, { useRef } from "react";
import CNavbar from './navbar';
import CFooter from './footer';
import CMainFrame from './mainframe';
import Instrument from './instrument';
import SystemSetting from './systemsetting';
import SideBar from './sidebar';

function App() {
  const instr_comp = useRef(null);
  const sysset_comp = useRef(null);
  const sidebar_comp = useRef(null);
  return (
    <>
      <CNavbar callHome={() => {
          instr_comp.current.clickHome();
        }}
        callSystemSet={() => {
          sysset_comp.current.clickMe();
        }}
        callSidebar={() => {
          sidebar_comp.current.clickMe();
        }}/>
      <CMainFrame>
        <Instrument ref={instr_comp}/>
      </CMainFrame>
      <SystemSetting ref={sysset_comp}/>
      <SideBar ref={sidebar_comp}/>
      <CFooter />
    </>
  );
}

export default App;
