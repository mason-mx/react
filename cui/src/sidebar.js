import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ListGroup from 'react-bootstrap/ListGroup';

const { forwardRef, useImperativeHandle } = React;

const SideBar = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);
  const [chassis_mode, setChassisMode] = useState("SINGLE");
  const [company, setCompany] = useState("Example Corporation");
  const [server_version, setServerVer] = useState("x.xx.xx");
  const [platform, setPlatform] = useState("PXIE");
  var resoure_link = "https://www.quantifiphotonics.com/resources/drivers-software-and-manuals/pxi-resources/";

  const handleClose = () => setShow(false);

  useImperativeHandle(ref, () => ({
    clickMe() {
        setShow(true);
    },
    updateInfo(obj) {
      setChassisMode(obj.chassis_mode);
      setCompany(obj.company);
      setServerVer(obj.server_version);
      setPlatform(obj.platform);
    }
  }));

  if (platform === 'EPIQ') {
    resoure_link = "https://www.quantifiphotonics.com/resources/drivers-software-and-manuals/epiq-resources/";
  } else if (platform === 'MTRQ') {
    resoure_link = "https://www.quantifiphotonics.com/resources/drivers-software-and-manuals/matriq-resources/";
  }

  return (
    <Offcanvas show={show} onHide={handleClose} placement='end'>
      <Offcanvas.Header closeButton>
          <Offcanvas.Title>CUI&trade;</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
          <ListGroup>
            <ListGroup.Item>Company: {company}</ListGroup.Item>
            <ListGroup.Item>Server Version: {server_version}</ListGroup.Item>
            <ListGroup.Item>Chassis Mode: {chassis_mode}</ListGroup.Item>
          </ListGroup>
          <p>Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc. </p>
          <p>CUI-33:</p>
          <Button variant="link" href={resoure_link} target="_blank">Resouces</Button><br/>
          <Button variant="outline-info" href="mailto:support@quantifiphotonics.com">Customer Support</Button>
      </Offcanvas.Body>
    </Offcanvas>
  );
});

export default SideBar;