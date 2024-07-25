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
            <Row>
                <div className="col-12 col-lg-6 col-xl-4 my-1 py-1 settable-property shadow-sm">
                    <FInputControl label="Amplitude"/>
                </div>
                <div className="col-12 col-lg-6 col-xl-4 my-1 py-1 settable-property shadow-sm">
                    <ISelectControl label="Info select"/>
                </div>
                <div className="col-12 col-lg-6 col-xl-4 my-1 py-1 settable-property shadow-sm">
                    <FSelectControl label="Opt select"/>
                </div>
            </Row>
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
                        {
                            section === "ED" ? (
                                <Row>
                                    <div className="col-12 col-lg-6 col-xl-4 my-1 py-1 settable-property shadow-sm">
                                        <FInputControl label="Amplitude"/>
                                    </div>
                                    <div className="col-12 col-lg-6 col-xl-4 my-1 py-1 settable-property shadow-sm">
                                        <ISelectControl label="Info select"/>
                                    </div>
                                    <div className="col-12 col-lg-6 col-xl-4 my-1 py-1 settable-property shadow-sm">
                                        <FSelectControl label="Opt select"/>
                                    </div>
                                </Row>
                            ) : (
                                <Row>
                                    <div className="col-12 col-lg-6 col-xl-4 my-1 py-1 settable-property shadow-sm">
                                        <FInputControl label="Pattern"/>
                                    </div>
                                    <div className="col-12 col-lg-6 col-xl-4 my-1 py-1 settable-property shadow-sm">
                                        <ISelectControl label="Info select"/>
                                    </div>
                                    <div className="col-12 col-lg-6 col-xl-4 my-1 py-1 settable-property shadow-sm">
                                        <FSelectControl label="Opt select"/>
                                    </div>
                                </Row>
                            )
                        }
                        <Row>
                            <Button>Submit</Button>
                        </Row>
                    </Container>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default PAM4