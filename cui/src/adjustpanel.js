import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import SettableControl from './property/settablevalue.js';

const { forwardRef, useImperativeHandle } = React;

function populateProperty(slot, channel, key, value, index) {
    if('set' in value)
    {
        return (
            <Col className="p-1" xs={12} md={6} key={index}>
                <SettableControl slot={slot} channel={channel} label={key} model={value}/>
            </Col>
        )
    }
    return;
}

const AdjustPanel = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);
  const [channelNumber, setChannelNumber] = useState(1);
  const [sync, setSync] = useState(false);

  const model = props.model;

  useImperativeHandle(ref, () => ({
    fillChannel(channelNumber) {
        setChannelNumber(channelNumber);
        setShow(true);
        setSync(false);
      }
  }));

  const handleClose = () => setShow(false);
  const onSyncChannelChange = (evt) => {
    setSync(evt.target.checked);
  };
  const select = (channelNumber === 0 ? <Form.Select disabled={sync} aria-label="Default select example">
        <option>Select One Channel</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
    </Form.Select> : <></>);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                <strong>CHANNEL {channelNumber}</strong>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Container>
                <Row>
                    <Col className="p-1 d-flex align-items-center" xs={12} md={6}>
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Apply to Other Channels"
                            value="off"
                            onChange={onSyncChannelChange}
                        />
                    </Col>
                    <Col className="p-1" xs={12} md={6}>
                        {select}
                    </Col>
                </Row>
                <Row>
                    {Object.keys(model).map((key, index) => (
                        populateProperty(props.slot, channelNumber, key, model[key], index)
                    ))}
                </Row>
            </Container>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={handleClose}>Submit</Button>
            <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
        </Modal>
    </>
  );
});

export default AdjustPanel;