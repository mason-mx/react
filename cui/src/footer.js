import React, { useState } from 'react';
import "./footer.scss";

const { forwardRef, useImperativeHandle } = React;

const CFooter = forwardRef((props, ref) => {
    const [msg, setMsg] = useState("Ready");

    useImperativeHandle(ref, () => ({
        updateMsg(msg) {
            setMsg(msg);
        }
    }));

    return (
        <footer className="footer">
        <div className="d-flex justify-content-between py-1 px-2">
            <div>{msg}</div>
            <div>Copyright &copy; 2018-{(new Date().getFullYear())}, Example Corporation</div>
        </div>
        </footer>
    )
});

export default CFooter