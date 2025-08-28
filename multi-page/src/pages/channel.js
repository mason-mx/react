import React, { useEffect, useRef, useState } from "react";
import '../matrial/controls.scss';
import { useParams } from 'react-router';

import BertChannel from './bertchannel';
import BertGlobal from './bertglobal';
import BertSidebar from './bertsidebar';
import LaserChannel from './laserchannel';
import VOAChannel from './voachannel';

const Channel = (props) => {
	var { chassis, slot, channel } = useParams();
	var self_serving = true;
	if(chassis === undefined) { chassis = props.chassis; }
	if(slot === undefined) { slot = props.slot; }
	if(channel === undefined) { channel = props.channel; self_serving = false; }

	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [deviceType, setDeviceType] = useState("");
	const [msg, setMsg] = useState('{"msg": "type"}');
	const [model, setModel] = useState({});

	const ws = useRef(null);

	useEffect(() => {
		if(self_serving)
		{
			// Establish WebSocket connection
			ws.current = new WebSocket('ws://127.0.0.1:12345');

			ws.current.onopen = () => {
				console.log('WebSocket connected');
				ws.current.send(JSON.stringify({chassis: 0, slot: 9, channel: channel, action: "activate"}));
			};

			ws.current.onmessage = (event) => {
				console.log('Received message:', event.data);
				setMsg(event.data);
			};

			ws.current.onclose = () => {
				console.log('WebSocket disconnected');
			};

			ws.current.onerror = (error) => {
				console.error('WebSocket error:', error);
			};

			// Cleanup function: close WebSocket when component unmounts
			return () => {
				if (ws.current) {
					ws.current.close();
				}
			};
		}
	}, []);

	useEffect(() => {
		fetch("http://localhost/instrument/blade" + slot + "/channel" + channel)
			.then(res => res.json())
			.then(
				(result) => {
					setIsLoaded(true);
					//console.log(result);
					setModel(result);
					setDeviceType(result.device_type);
				},
				(error) => {
					setIsLoaded(true);
					setError(error);
				}
			)
	}, [slot,channel])

	if (!isLoaded) {
		return (
		<>
			<div class="d-flex justify-content-center">
				<div class="spinner-grow text-primary" role="status">
				<span class="visually-hidden">...</span>
				</div>
				<div class="spinner-grow text-secondary" role="status">
				<span class="visually-hidden">...</span>
				</div>
				<div class="spinner-grow text-success" role="status">
				<span class="visually-hidden">...</span>
				</div>
			</div>
		</>);
	} else {
		try {
			switch (deviceType) {
				case "3":
					return <LaserChannel chassis={chassis} slot={slot} channel={channel}/>
				case "VOA_DEVICE":
					return <VOAChannel chassis={chassis} slot={slot} channel={channel} msg={msg} model={model}/>
				case "9":
					return (
						<div className="container-fluid bd-gutter">
							<BertSidebar/>
							<main className="bert-main-has-sidebar">
								<BertGlobal chassis={chassis} slot={slot}/>
								<BertChannel chassis={chassis} slot={slot} channel={channel}/>
							</main>
						</div>
					)
				default:
					return (
						<>
							<h5 className="placeholder-glow">
								<span className="placeholder col-6"></span>
							</h5>
						</>
					)
			}
		} catch (error) {
			return (
				<>
					<h5>500 Error</h5>
				</>
			)
		}
	}
};

export default Channel;