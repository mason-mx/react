import Channel from "./channel";

const LaserPage = (props) => {
	const chassis = props.chassis;
	const slot = props.slot;
	return (
		<>
			<div className="container-fluid bd-gutter">
                <div className="row">
				    <Channel chassis={chassis} slot={slot} channel={1} />
				    <Channel chassis={chassis} slot={slot} channel={2}/>
                </div>
			</div>
		</>
	);
};

export default LaserPage;