import { useState, useEffect, createContext, useRef } from "react"
import CWs from './websocket';

const WebSocketContext = createContext()

function WebSocketProvider({ children }) {
    const [isReady, setIsReady] = useState(false);
    const [val, setVal] = useState(null);
    const ws = useRef(null)

    useEffect(() => {
        /* WS initialization and cleanup */
        const socket = new CWs('ws://127.0.0.1:12345');
        socket.onopen = () => { setIsReady(true); }
        socket.onclose = () => { setIsReady(false); }
        socket.onmessage = (message) => {
            setVal(message.data);
        }
        socket.onerror = (message) => {
            setVal(message.data);
        }
        ws.current = socket;
        return () => { socket.close() }
    }, [])

    /* WS provider dom */
    /* subscribe and unsubscribe are the only required prop for the context */
    return (
        <WebSocketContext.Provider value={[isReady, val, ws.current?.send.bind(ws.current)]}>
            {children}
        </WebSocketContext.Provider>
    )
}

export { WebSocketContext, WebSocketProvider }