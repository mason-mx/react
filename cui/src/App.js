import './App.css';
import React, { useRef } from "react";
import CNavbar from './navbar';
import CFooter from './footer';
import CMainFrame from './mainframe';
import Instrument from './instrument';
import SystemSetting from './systemsetting';
import SideBar from './sidebar';
import StackingSnackBar from './toast.js';

const WS_URL = 'ws://127.0.0.1:12345';
var ws = null;

function CWebsocket(toast_comp) {
  ws = new WebSocket(WS_URL);

  if ("WebSocket" in window){
    ws.onopen = function()
    {
      var apiCall = {
        event: "bts:subscribe",
        data: { channel: "order_book_btcusd" },
      };
      ws.send(JSON.stringify(apiCall));
    };

    ws.onmessage = function (evt)
    {
      var data = JSON.parse(evt.data)
      console.log(data);
      try {
        if ((data.event = "data")) {
          toast_comp.current.addToast({"time": "11 mins ago", "message": evt.data});
        }
      } catch (err) {
        console.log(err);
      }
      if(data.status === "error") {
        console.log("Error\n" + data.status_message);
        return;
      }

      if(data.hasOwnProperty("laser_status")) {
        console.log(data.laser_status);
      }
    }

    ws.onclose = function(e)
    {
      console.log('Socket is closed. Reconnect will be attempted in 5 second.', e.reason);
      setTimeout(function() {
        CWebsocket(toast_comp);
      }, 5000);
    };

    ws.onerror = function(err) {
      console.log('Socket encountered error: ', err, 'Closing socket');
      ws.close();
    }
  }
  else {
      // The browser doesn't support WebSocket
      console.log("WebSocket NOT supported by your Browser!");
  }
 }

function App() {
  const instr_comp = useRef(null);
  const sysset_comp = useRef(null);
  const sidebar_comp = useRef(null);
  const toast_comp = useRef(null);

  CWebsocket(toast_comp);

  // const ws = new WebSocket(WS_URL);

  // const apiCall = {
  //   event: "bts:subscribe",
  //   data: { channel: "order_book_btcusd" },
  // };

  // ws.onopen = (event) => {
  //   ws.send(JSON.stringify(apiCall));
  // };

  // ws.onmessage = function (event) {
  //   const json = JSON.parse(event.data);
  //   try {
  //     if ((json.event = "data")) {
  //       toast_comp.current.addToast({"time": "11 mins ago", "message": event.data});
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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
      <SideBar ref={sidebar_comp}
        callToast={() => {
          toast_comp.current.addToast({"time": "11 mins ago", "message": "message 1"});
        }}/>
      <StackingSnackBar ref={toast_comp}/>
      <CFooter />
    </>
  );
}

export default App;
