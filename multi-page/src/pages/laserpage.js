import Channel from "./channel";

const LaserPage = () => {
	return (
		<>
			<div className="container-fluid bd-gutter">
                <div className="row">
				    <Channel channel={1} />
				    <Channel channel={2}/>

                </div>
			</div>
		</>
	);
};

export default LaserPage;