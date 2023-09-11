import './App.css';
import React, { useRef } from "react";
import CNavbar from './navbar';
import CFooter from './footer';
import CMainFrame from './mainframe';
import Instrument from './instrument';
import SystemSetting from './systemsetting';
import SideBar from './sidebar';
import StackingSnackBar from './toast.js';

import { useTranslation } from "react-i18next";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en.json";
import translationFR from "./locales/fr.json";

var language = navigator.language ||   // All browsers
              navigator.userLanguage; // IE <= 10

var shortLang = language;
if (shortLang.indexOf('-') !== -1)
    shortLang = shortLang.split('-')[0];

if (shortLang.indexOf('_') !== -1)
    shortLang = shortLang.split('_')[0];

const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: shortLang,
  fallbackLng: shortLang,
  interpolation: {
    escapeValue: false,
  },
  parseMissingKeyHandler: (key, defaultValue) => {
    let string = key.replaceAll('_', " ");
    string = string.replace(/^./, string[0].toUpperCase())
    return string;
  },
});

const WS_URL = 'ws://127.0.0.1:12345';
var ws = null;

function CWebsocket(toast_comp, footer_comp) {
  ws = new WebSocket(WS_URL);
  const { t } = useTranslation();

  if ("WebSocket" in window){
    ws.onopen = function()
    {
      var apiCall = {
        event: "bts:subscribe",
        data: { channel: "order_book_btcusd" },
      };
      ws.send(JSON.stringify(apiCall));
    };

    ws.onmessage = function (event)
    {
      const msg = JSON.parse(event.data);
      const time = new Date(msg.date);
      const timeStr = time.toLocaleTimeString();

      switch (msg.type) {
        case "id":
          break;
        case "username":
          break;
        case "message":
          toast_comp.current.addToast({"time": timeStr, "message": msg.text});
          if(msg.hasOwnProperty("laser_status")) {
            console.log(msg.laser_status);
          }
          break;
        case "rejectusername":
          break;
        case "userlist":
          break;
        case "status":
          footer_comp.current.updateMsg(msg.text);
          break;
        default:
          break;
      }
    }

    ws.onclose = function(err)
    {
      footer_comp.current.updateMsg(t("error_ws_closed"), err.reason);
      // setTimeout(function() {
      //   CWebsocket(toast_comp, footer_comp);
      // }, 5000);
    };

    ws.onerror = function(err) {
      footer_comp.current.updateMsg('Socket encountered error: ', err, 'Closing socket');
      ws.close();
    }
  }
  else {
      // The browser doesn't support WebSocket
      footer_comp.current.updateMsg("WebSocket NOT supported by your Browser!");
  }
 }

function App() {
  const instr_comp = useRef(null);
  const sysset_comp = useRef(null);
  const sidebar_comp = useRef(null);
  const toast_comp = useRef(null);
  const footer_comp = useRef(null);

  CWebsocket(toast_comp, footer_comp);

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
        <Instrument ref={instr_comp}
        updateSidebar={(obj) => {
          sidebar_comp.current.updateInfo(obj);
        }}/>
      </CMainFrame>
      <SystemSetting ref={sysset_comp}/>
      <SideBar ref={sidebar_comp}/>
      <StackingSnackBar ref={toast_comp}/>
      <CFooter ref={footer_comp}/>
    </>
  );
}

export default App;
