import React, { useState, useEffect } from "react";
import '../matrial/controls.scss';
import { useParams } from 'react-router';

import PAM4Page from './pam4page';
import Channel from "./channel";

const Module = (props) => {
	var { chassis, slot } = useParams();
	if(chassis === undefined) { chassis = props.chassis; }
	if(slot === undefined) { slot = props.slot; }

	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [channelCount, setChannelCount] = useState(0);
	const [deviceType, setDeviceType] = useState("");

	useEffect(() => {
		fetch("http://localhost/instrument/blade" + slot)
			.then(res => res.json())
			.then(
				(result) => {
					setIsLoaded(true);
					setChannelCount(result.channel_count);
					setDeviceType(result.device_type);
				},
				(error) => {
					setIsLoaded(true);
					setError(error);
				}
			)
	}, [slot])

	var channels = [];
    for (var i = 0; i < channelCount; i++)
    {
      channels.push(
        <Channel chassis={chassis} slot={slot} channel={i+1} key={i} />
      );
    }

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
				case "9":
					return (
						<PAM4Page chassis={chassis} slot={slot}/>
					)
				case "3":
				case "VOA_DEVICE":
					return (
							<div className="container-fluid bd-gutter">
								<div className="row">
									{channels}
								</div>
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

export default Module;