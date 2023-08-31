import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ListGroup from 'react-bootstrap/ListGroup';

const { forwardRef, useImperativeHandle } = React;

const SideBar = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);
  const [chassis_mode, setChassisMode] = useState("SINGLE");
  const [server_version, setServerVer] = useState("x.xx.xx");
  const [platform, setPlatform] = useState("PXIE");
  var resource_link = "https://www.quantifiphotonics.com/resources/drivers-software-and-manuals/pxi-resources/";

  const handleClose = () => setShow(false);

  useImperativeHandle(ref, () => ({
    clickMe() {
        setShow(true);
    },
    updateInfo(obj) {
      setChassisMode(obj.chassis_mode);
      setServerVer(obj.server_version);
      setPlatform(obj.platform);
    }
  }));

  if (platform === 'EPIQ') {
    resource_link = "https://www.quantifiphotonics.com/resources/drivers-software-and-manuals/epiq-resources/";
  } else if (platform === 'MTRQ') {
    resource_link = "https://www.quantifiphotonics.com/resources/drivers-software-and-manuals/matriq-resources/";
  }

  return (
    <Offcanvas show={show} onHide={handleClose} placement='end'>
      <Offcanvas.Header closeButton>
          <Offcanvas.Title>CUI&trade;</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
          <ListGroup>
            <ListGroup.Item>Server Version: {server_version}</ListGroup.Item>
            <ListGroup.Item>Chassis Mode: {chassis_mode}</ListGroup.Item>
          </ListGroup>
          <p>Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc. </p>
          <p>CUI-33:</p>
          <Button variant="link" href={resource_link} target="_blank">Resources</Button><br/>
          <Button variant="link" href="https://www.linkedin.com/company/quantifiphotonics/mycompany/" target="_blank"><img src="LI-Logo.png" alt="" height="18"/></Button><br/>
          <Button variant="outline-info" href="mailto:support@quantifiphotonics.com">Customer Support</Button>
      </Offcanvas.Body>
    </Offcanvas>
  );
});

export default SideBar;