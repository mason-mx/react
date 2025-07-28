import BertChannel from './bertchannel';
import BertGlobal from './bertglobal';
import BertSidebar from './bertsidebar';
import BertNavbar from './bertnavbar';

const PAM4Page = (props) => {
	const chassis = props.chassis;
	const slot = props.slot;
	return (
		<>
			<div className="container-fluid bd-gutter">
				<BertSidebar/>
				<main className="bert-main-has-sidebar bert-main-has-navbar bert-page-has-navbar">
					<BertGlobal chassis={chassis} slot={slot}/>
					<BertChannel chassis={chassis} slot={slot} channel={1}/>
				</main>
				<BertNavbar/>
			</div>
		</>
	);
};

export default PAM4Page;