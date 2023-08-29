import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

function SnackBar(props) {
    const [show, setShow] = useState(true);
    return (
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
            <Toast.Header>
            <strong className="me-auto">Message</strong>
            <small>{props.time}</small>
            </Toast.Header>
            <Toast.Body>{props.message}</Toast.Body>
        </Toast>
    );
}

const { forwardRef, useImperativeHandle } = React;

const StackingSnackBar = forwardRef((props, ref) => {
    const [toasts, setToasts] = useState([]);

    useImperativeHandle(ref, () => ({
        addToast(obj) {
            var toast = (<SnackBar
                time = {obj.time}
                message = {obj.message}
                key = {toasts.length} // There is an issue of having same key, as two ws messages could arrive at the same time
            />);
            setToasts(current => [toast, ...current]);
        }
    }));

    if (toasts.length > 0) {
        return (
            <ToastContainer className="p-3" position="bottom-end" style={{ zIndex: 1031 }}>
                {toasts}
            </ToastContainer>
        );
    }
});

export default StackingSnackBar;