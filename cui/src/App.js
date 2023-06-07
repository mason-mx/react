import './App.css';
import React, { useRef } from "react";
import CNavbar from './navbar';
import CFooter from './footer';
import Instrument from './instrument';

function App() {
  const instr_comp = useRef(null);
  return (
    <>
      <CNavbar callHome={() => {
          instr_comp.current.clickHome();
        }}/>
      <Instrument ref={instr_comp}/>
      <CFooter />
    </>
  );
}

export default App;
