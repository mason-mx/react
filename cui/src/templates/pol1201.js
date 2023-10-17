import React, { useEffect, useState, useRef } from "react"
import InputGroupControl from '../property/inputgroup';

import { useTranslation } from "react-i18next";
import {getData, putData} from '../fetch'

import Plot from 'react-plotly.js';

import "../controls.scss";

const POL1201 = (props) => {
    //const id = "slot_" + props.slot + "_channel_" + props.channel;
    const url = "/instrument/chassis" +  + props.chassis + "/blade" + props.slot + "/channel1";
    const timerIdRef = useRef(null);
    const { t } = useTranslation();

    const [model, setModel] = useState(props.model);
    const [theta, setTheta] = useState(0.3);
    const [phi, setPhi] = useState(0.2);
    const [mode, setMode] = useState(0);
    const [count, setCount] = useState(0);
    
    const [layout, setLayout] = useState(
        {
            showlegend: false,
            hovermode: false,
            scene:{
                camera: {
                    eye: {x: 2, y: 0.3, z: 0.2 },
                    projection: { type: 'orthographic'}
                },
                aspectmode: 'manual',
                aspectratio: {x: 2, y: 2, z: 2 },
                xaxis: {
                    showgrid: false,
                    ticks: '',
                    title: '',
                    showticklabels: false,
                    zeroline: false,
                    showspikes: false
                },
                yaxis: {
                    showgrid: false,
                    ticks: '',
                    title: '',
                    showticklabels: false,
                    zeroline: false,
                    showspikes: false
                },
                zaxis: {
                    showgrid: false,
                    ticks: '',
                    title: '',
                    showticklabels: false,
                    zeroline: false,
                    showspikes: false
                }
            },
            margin: {
                l: 0,
                r: 0,
                b: 0,
                t: 0
            }
        }
    );

    const [sphereGraphConfig, setSphereGraphConfig] = useState(
        {
            'showLink': false,
            'displaylogo': false,
            'scrollZoom': false,
            'modeBarButtonsToRemove':
            [
                'sendDataToCloud', 'zoom3d', 'pan3d', 'resetCameraDefault3d', 'orbitRotation', 'tableRotation', 'toggleHover', 'hoverClosest3d'
            ],
            editable: false
        }
    );

    const [graphData, setGraphData] = useState(
        [
            {
                x: [1, 2, 3],
                y: [2, 6, 3],
                type: 'scatter',
                mode: 'lines+markers',
                marker: {color: 'red'},
            },
            {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]}
        ]
    );

    const makeInterval = (startValue, stopValue, numPoints) => {
        var arr = [];
        var step = (stopValue - startValue) / (numPoints - 1);
        for (var i = 0; i < numPoints; i++) {
            arr.push(startValue + (step * i));
        }
        return arr;
    }

    const composeSphereData = () => {
        var a = [];
        var b = [];
        var c = [];

        var phiArr = makeInterval(0, Math.PI/2, 20);
        var thetaArr = makeInterval(0, 2*Math.PI, 20);

        for (var i = 0; i < thetaArr.length; i ++){
            for (var j = 0; j < phiArr.length; j ++){
                a.push(Math.cos(thetaArr[i]) * Math.sin(phiArr[j]));
                b.push(Math.sin(thetaArr[i]) * Math.sin(phiArr[j]));
                c.push(Math.cos(phiArr[j]));
            }
        }

        const dataitem = {
            opacity: 0.2,
            color: '#e6e6e6',
            type: 'mesh3d',
            x: a,
            y: b,
            z: c,
        }

        var cos = [];
        var sin = [];
        var zero = [];
        var angleArr = makeInterval(0, 2*Math.PI,61);
        for (i = 0; i < angleArr.length; i++){
            cos.push(Math.cos(angleArr[i]).toFixed(15));
            zero.push(0);
            sin.push(Math.sin(angleArr[i]).toFixed(15));
        }

        var x_axis = {
            x: cos,
            y: zero,
            z: sin,
            mode: 'lines',
            line: {
                width: 3,
                color: 'grey',
                reversescale: false
            },
            type: 'scatter3d'
        };

        var y_axis = {
            x: zero,
            y: cos,
            z: sin,
            mode: 'lines',
            line: {
                width: 3,
                color: 'grey',
                reversescale: false
            },
            type: 'scatter3d'
        };

        var z_axis = {
            x: cos,
            y: sin,
            z: zero,
            mode: 'lines',
            line: {
                width: 3,
                color: '#00a9ce',
                reversescale: false
            },
            type: 'scatter3d'
        };

        var y_level = {
            x: [0,0],
            y: [0,1],
            z: [0,0],
            mode: 'lines',
            line: {
                dash: 'dot',
                width: 3,
                color: 'grey',
                reversescale: false
            },
            type: 'scatter3d'
        };

        var x_level = {
            x: [0,1],
            y: [0,0],
            z: [0,0],
            mode: 'lines',
            line: {
                dash: 'dot',
                width: 3,
                color: 'grey',
                reversescale: false
            },
            type: 'scatter3d'
        };

        var z_level = {
            x: [0,0],
            y: [0,0],
            z: [0,1],
            mode: 'lines',
            line: {
                dash: 'dot',
                width: 3,
                color: 'grey',
                reversescale: false
            },
            type: 'scatter3d'
        };

        var S1 = {
            x: [1, 1.2],
            y: [0, 0],
            z: [0, 0],
            mode: 'lines+text',
            text: ['', 'S1'],
            textposition: 'middle center',
            type: 'scatter3d'
        };
        var S2 = {
            x: [0, 0],
            y: [1, 1.2],
            z: [0, 0],
            mode: 'lines+text',
            text: ['', 'S2'],
            textposition: 'middle center',
            type: 'scatter3d'
        };
        var S3 = {
            x: [0, 0],
            y: [0, 0],
            z: [1, 1.2],
            mode: 'lines+text',
            text: ['', 'S3'],
            textposition: 'middle center',
            type: 'scatter3d'
        };
        var data = [dataitem,
            {...dataitem, z: c.map(v => -v)},
            x_axis, y_axis, z_axis, x_level, y_level, z_level, S1, S2, S3];
        return data;
    };

    const composePointData = (theta, phi) => {
        var point_x = Math.cos(theta);
        var slice_radius = Math.sin(theta);
        var point_z = slice_radius * Math.sin(phi);
        var point_y = slice_radius * Math.cos(phi);

        var mark = {
            x: [point_x],
            y: [point_y],
            z: [point_z],
            mode: 'markers+text',
            text: ['Current'],
            textposition: 'top',
            marker: {
                size: 5,
                color: "yellow"
            },
            type: 'scatter3d'
        };

        var cos = [];
        var sin = [];
        var zero = [];
        var radius = Math.abs(slice_radius);
        var angleArr = makeInterval(0, 2 * Math.PI, 61);
        for (var i = 0; i<  angleArr.length; i ++){
            cos.push(radius * Math.cos(angleArr[i]).toFixed(15));
            zero.push(point_x);
            sin.push(radius * Math.sin(angleArr[i]).toFixed(15));
        }

        var y_slice = {
            x: zero,
            y: cos,
            z: sin,
            mode: 'lines',
            line: {
                width: 3,
                color: '#d0006f',
                reversescale: false
            },
            type: 'scatter3d'
        };

        var center_z = {
            x: [0, point_x],
            y: [0, slice_radius],
            z: [0, 0],
            mode: 'lines',
            line: {
                width: 3,
                color: '#00a9ce',
                reversescale: false
            },
            type: 'scatter3d'
        };

        var slice_z = {
            x: [point_x, point_x],
            y: [0, slice_radius],
            z: [0, 0],
            mode: 'lines',
            line: {
                width: 3,
                color: '#d0006f',
                reversescale: false
            },
            type: 'scatter3d'
        };

        var radius = {
            x: [point_x, point_x],
            y: [0, point_y],
            z: [0, point_z],
            mode: 'lines',
            line: {
                width: 3,
                color: '#d0006f',
                reversescale: false
            },
            type: 'scatter3d'
        };

        var x_sector_phi = [];
        var y_sector_phi = [];
        var z_sector_phi = [];
        x_sector_phi.push(point_x);
        y_sector_phi.push(0);
        z_sector_phi.push(0);

        var sector = makeInterval(0, Math.abs(phi), 16);
        var sign = Math.sign(slice_radius);
        var arc_radius = 0.2 * Math.abs(slice_radius);
        for (i = 0; i < sector.length; i++)
        {
            var z = sign * Math.sin(sector[i]);
            var y = sign * Math.cos(sector[i]);
            x_sector_phi.push(point_x);
            y_sector_phi.push(y * arc_radius);
            z_sector_phi.push(z * arc_radius);
        }
        x_sector_phi.push(point_x);
        y_sector_phi.push(0);
        z_sector_phi.push(0);

        var arc_phi = {
            x: x_sector_phi,
            y: y_sector_phi,
            z: z_sector_phi,
            mode: 'lines',
            line: {
                width: 3,
                color: '#d0006f',
                reversescale: false
            },
            type: 'scatter3d'
        };

        var x_sector_theta = [];
        var y_sector_theta = [];
        var z_sector_theta = [];
        x_sector_theta.push(0);
        y_sector_theta.push(0);
        z_sector_theta.push(0);

        sector = makeInterval(0, Math.abs(theta), 16);
        for (i = 0; i < sector.length; i ++)
        {
            z = 0;
            var x = Math.cos(sector[i]);
            y = Math.sin(sector[i]);
            x_sector_theta.push(x * 0.2);
            y_sector_theta.push(y * 0.2);
            z_sector_theta.push(z * 0.2);
        }
        x_sector_theta.push(0);
        y_sector_theta.push(0);
        z_sector_theta.push(0);

        var arc_theta = {
            x: x_sector_theta,
            y: y_sector_theta,
            z: z_sector_theta,
            mode: 'lines',
            line: {
                width: 3,
                color: '#00a9ce',
                reversescale: false
            },
            type: 'scatter3d'
        };
        var data = [mark, y_slice, center_z, slice_z, radius, arc_phi, arc_theta];
        return data;
    };
    
    const [sphere_data, setSphereData] = useState(composeSphereData().concat(composePointData(0.3, 0.2)));

    const onPutSuccess = (result) => {
    };

    const onPutFailure = (error) => {
    };

    const setupTimeouts = () => {
        timerIdRef.current = setTimeout(() => {
            setCount((count) => count + 1);
            getData(url, onFetchSuccess, onFetchFailure);
        }, 1000);
    };

    const onFetchSuccess = (result) => {
        setModel(result);
        setupTimeouts();
    };

    const onFetchFailure = (error) => {
        clearTimeout(timerIdRef.current);
    };

    useEffect(() => {
        //setSphereData();
        setupTimeouts();
        return () => {
            clearTimeout(timerIdRef.current);
        };
    }, []);

    useEffect(() => {
        setSphereData(composeSphereData().concat(composePointData(theta, phi)));
    }, [theta, phi]);

    return (
        <>
            <div className='row'>
                <h3>{props.title}</h3>
                <h1>I've rendered {count} times!</h1>
            </div>
            <div className="row">
                <div className="col-2 p-0">
                    <InputGroupControl chassis={props.chassis} slot={props.slot} channel={1} label={t("wavelength")} attr={"wavelength"} model={model.wavelength}/>
                    <div className="row m-0 border border-warning property-control">
                        <div className="col-9 m-auto" id="report_state_val">Scan Optimize</div>
                        <div className="col-3 m-auto"><img src="./img/spinner.gif" id="report_state_img" /></div>
                    </div>
                    <div className="row m-0 header-control">
                        <div className="col-12 px-2 d-flex align-itmes-center section-header">
                            <div className="my-auto">Operation modes:</div>
                        </div>
                    </div>
                    <div className="container p-0 section-panel" id="mode_selection_section">
                        <div className="row m-0 property-control">
                            <div className="col-12 d-flex align-items-center p-0 px-1">
                                <button className="btn-block btn btn-selected" id="manual_mode">Manual control</button>
                            </div>
                        </div>
                        <div className="row m-0 property-control">
                            <div className="col-12 d-flex align-items-center p-0 px-1">
                                <button className="btn-block btn btn-deselected" id="scan_mode">Scan and optimize</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-10 p-0" id="right_panel">
                    <div className="row m-0" id="manual_ctrl_panel">
                        <div className="col-6 p-0">
                            <div id="poincare_sphere_graph">
                                <Plot
                                    data={sphere_data}
                                    layout={layout}
                                    config={sphereGraphConfig}
                                    useResizeHandler={true}
                                    style={{width: "100%", height: "100%"}}
                                />
                            </div>
                        </div>
                        <div className="col-6 p-0 bg-info">
                            <Plot
                                data={graphData}
                                layout={ {title: 'A Fancy Plot'} }
                                useResizeHandler={true}
                                style={{width: "100%", height: "100%"}}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default POL1201