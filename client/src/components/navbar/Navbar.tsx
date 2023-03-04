import Connection from "../connection/Connection";

export default function Navbar(props: {connected : boolean}): JSX.Element {
	return (
		<div className="flex flex-row w-full justify-end">
			<div className="pr-5 border-box">
				<Connection connected={props.connected} />	
			</div>
		</div>
	);
}
