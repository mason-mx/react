import React, { useState, useRef } from "react";
import "../controls.scss";
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

import SwitchControl from "../property/onoff";
import FInputControl from '../property/floatinglabel';
import ISelectControl from '../property/infoselects';
import FSelectControl from '../property/floatingselects';

import { GearWideConnected } from 'react-bootstrap-icons';

const PAM4 = (props) => {
    //let model = props.model;
    const [show, setShow] = useState(false);
    const [section, setSection] = useState("PPG");

    const handleClose = () => setShow(false);
    const handleShow = (section) => {
        setSection(section);
        setShow(true);
    }
    return (
        <>
            <Accordion defaultActiveKey={['0']} alwaysOpen>
                <Accordion.Item eventKey="0">
                <Accordion.Header>PPG</Accordion.Header>
                <Accordion.Body>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                            <th scope="col"><GearWideConnected onClick={() => {handleShow("PPG")}}/></th>
                            <th scope="col">1</th>
                            <th scope="col">2</th>
                            <th scope="col">3</th>
                            <th scope="col">4</th>
                            <th scope="col">5</th>
                            <th scope="col">6</th>
                            <th scope="col">7</th>
                            <th scope="col">8</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Eye Heights</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>Mark</td>
                                <td>Otto</td>
                            </tr>
                            <tr>
                                <td>Eye Heights</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>Mark</td>
                                <td>Otto</td>
                            </tr>
                            <tr>
                                <td>Eye Heights</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>Mark</td>
                                <td>Otto</td>
                            </tr>
                            <tr>
                                <td>Eye Heights</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>Mark</td>
                                <td>Otto</td>
                            </tr>
                            <tr>
                                <td>Eye Heights</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>Mark</td>
                                <td>Otto</td>
                            </tr>
                        </tbody>
                    </table>
                </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                <Accordion.Header>Error dectector</Accordion.Header>
                <Accordion.Body>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                            <th scope="col"><GearWideConnected onClick={() => {handleShow("ED")}}/></th>
                            <th scope="col">1</th>
                            <th scope="col">2</th>
                            <th scope="col">3</th>
                            <th scope="col">4</th>
                            <th scope="col">5</th>
                            <th scope="col">6</th>
                            <th scope="col">7</th>
                            <th scope="col">8</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Pattern</td>
                                <td>PRBS15</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>Mark</td>
                                <td>Otto</td>
                            </tr>
                            <tr>
                                <td>ED mode</td>
                                <td>Auto</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>Mark</td>
                                <td>Otto</td>
                            </tr>
                            <tr>
                                <td>EQ boost</td>
                                <td>0</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>Mark</td>
                                <td>Otto</td>
                            </tr>
                            <tr>
                                <td>Invert</td>
                                <td>ON</td>
                                <td>OFF</td>
                                <td>@mdo</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>Mark</td>
                                <td>Otto</td>
                            </tr>
                            <tr>
                                <td>Result Display</td>
                                <td>Accumulated</td>
                                <td>Instantaneous</td>
                                <td>Accumulated</td>
                                <td>Instantaneous</td>
                                <td>Accumulated</td>
                                <td>Instantaneous</td>
                                <td>Accumulated</td>
                                <td>Instantaneous</td>
                            </tr>
                            <tr>
                                <td>Point</td>
                                <td>Auto</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>Mark</td>
                                <td>Otto</td>
                            </tr>
                        </tbody>
                    </table>
                </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <Offcanvas show={show} placement="bottom" onHide={handleClose}>
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>{section} Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Container>
                        <Row>
                            <Col xs={12} md={6}>
                                {
                                    section === "ED" ? (
                                        <Form>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <FInputControl label="Amplitude"/>
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                                <FInputControl label="Amplitude"/>
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                                <FInputControl label="Amplitude"/>
                                            </Form.Group>
                                        </Form>
                                    ) : (
                                        <Form>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                                                <FInputControl label="Pattern"/>
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                                                <FInputControl label="Pattern"/>
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
                                                <FInputControl label="Pattern"/>
                                            </Form.Group>
                                        </Form>
                                    )
                                }
                            </Col>
                            <Col xs={12} md={6}>
                                .col-xs-12 .col-md-6
                            </Col>
                        </Row>
                        <Row>
                            <Button>Submit</Button>
                        </Row>
                    </Container>
                    {/* <FSelectControl label="ED Pattern"/>
                    <ISelectControl label="Display"/> */}
                    {/* <SwitchControl label="ED Invert"/> */}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default PAM4