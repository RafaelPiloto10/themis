import { useEffect, useState } from "react";

export default function Connection(props: { connected?: boolean }): JSX.Element {
	const styles = "w-[32px]";
	const [seconds, setSeconds] = useState(0);

	useEffect(() => {
		if (!props.connected) {
			setSeconds(0);
			const i = setInterval(() => {
				setSeconds((prevSeconds) => prevSeconds + 1);
			}, 1000);

			return () => clearInterval(i);
		}
	}, [props.connected]);

	const connecting = "Connecting to readers... please wait";
	const lostConnection = "Could not connect to readers! Verify connection or reset program!";

	if (!props.connected) {
		return (
			<div className="flex flex-row gap-2 items-center">
				<p className="text-red-500 text-xs">{seconds > 30 ? lostConnection : connecting} ({seconds}s)</p>
				<div className={`${styles} text-red-500`}>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="M3 3l8.735 8.735m0 0a.374.374 0 11.53.53m-.53-.53l.53.53m0 0L21 21M14.652 9.348a3.75 3.75 0 010 5.304m2.121-7.425a6.75 6.75 0 010 9.546m2.121-11.667c3.808 3.807 3.808 9.98 0 13.788m-9.546-4.242a3.733 3.733 0 01-1.06-2.122m-1.061 4.243a6.75 6.75 0 01-1.625-6.929m-.496 9.05c-3.068-3.067-3.664-7.67-1.79-11.334M12 12h.008v.008H12V12z" />
					</svg>
				</div>
			</div>
		);
	}

	return (
		<div className={`${styles} text-green-500`}>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
				<path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
			</svg>

		</div>
	);
}
