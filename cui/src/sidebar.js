import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

const { forwardRef, useImperativeHandle } = React;

const SideBar = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  useImperativeHandle(ref, () => ({
    clickMe() {
        setShow(true);
    }
  }));

  return (
    <Offcanvas show={show} onHide={handleClose} placement='end'>
    <Offcanvas.Header closeButton>
        <Offcanvas.Title>CUI&trade;</Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>
        <Button variant="primary" onClick={() => {props.callToast();}}>
            Launch
        </Button>
        Some text as placeholder. In real life you can have the elements you
        have chosen. Like, text, images, lists, etc.
    </Offcanvas.Body>
    </Offcanvas>
  );
});

export default SideBar;