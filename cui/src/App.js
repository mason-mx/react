import './App.css';
import React, { useRef } from "react";
import CNavbar from './navbar';
import CFooter from './footer';
import Instrument from './instrument';

function App() {
  const a_comp = useRef(null);
  return (
    <>
      <CNavbar callB={() => {
          a_comp.current.f();
        }}/>
      <Instrument ref={a_comp}/>
      <CFooter />
    </>
  );
}

export default App;
