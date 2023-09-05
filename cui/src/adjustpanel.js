import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

const { forwardRef, useImperativeHandle } = React;

const AdjustPanel = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);
  const [channelNumber, setChannelNumber] = useState(1);
  const [sync, setSync] = useState(false);

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
                <Col className="d-flex align-items-center" xs={12} md={6}>
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Sync Channel"
                        value="off"
                        onChange={onSyncChannelChange}
                    />
                </Col>
                <Col xs={12} md={6}>
                    {select}
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={8}>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="name@example.com"
                        autoFocus
                    />
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    >
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                </Form>
                </Col>
                <Col xs={6} md={4}>
                .col-xs-6 .col-md-4
                </Col>
            </Row>

            <Row>
                <Col xs={6} md={4}>
                .col-xs-6 .col-md-4
                </Col>
                <Col xs={6} md={4}>
                .col-xs-6 .col-md-4
                </Col>
                <Col xs={6} md={4}>
                .col-xs-6 .col-md-4
                </Col>
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