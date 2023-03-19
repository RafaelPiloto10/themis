import { Switch } from "@headlessui/react";
import { useState } from "react";
import Connection from "../connection/Connection";

export default function Navbar(props: { color: boolean, setColor: any, inverted: boolean, setInverted: any, connected: boolean }): JSX.Element {
	const [popup, setPopup] = useState(false);

	return (
		<div className="flex flex-col w-full">
			<div className="flex flex-row gap-2 pr-5 border-box justify-end">
				<Connection connected={props.connected} />

				<button onClick={() => setPopup(true)}>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:stroke-gray-600">
						<path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
						<path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
					</svg>
				</button>

				{popup && <SettingsPopup close={() => setPopup(false)}color={props.color} setColor={props.setColor} inverted={props.inverted} setInverted={props.setInverted} />}
			</div>
			<h1 className="text-4xl">Art Gallery Title Here</h1>
		</div>
	);
}

function SettingsPopup(props: { close: any, color: boolean, setColor: any, inverted: boolean, setInverted: any }): JSX.Element {
	return (
		<div className="w-full h-full absolute z-50 left-0 top-0 bg-[#282c34] pt-5 border-box flex flex-col">
			<h1 className="text-4xl">Settings</h1>
			<div className="w-100 h-100 mt-[6rem]flex-row gap-2">
				<div className="flex flex-col justify-center items-center my-[15%] gap-2">
					<div className="flex flex-row gap-2 w-[300px]">
						<Switch
							checked={props.inverted}
							onChange={(b) => {
								window.localStorage.setItem("inverted", String(b));
								props.setInverted(b);
							}}
							className={`${props.inverted ? 'bg-green-500' : 'bg-gray-600'} relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}>
							<span
								aria-hidden="true"
								className={`${props.inverted ? 'translate-x-6' : 'translate-x-0'} pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
							/>
						</Switch>
						<p className="">Invert Sides</p>
					</div>

					<div className="flex flex-row gap-2 w-[300px]">
						<Switch
							checked={props.color}
							onChange={(v) => {
								window.localStorage.setItem("color", String(v));
								props.setColor(v);
							}}
							className={`${props.color ? 'bg-green-500' : 'bg-gray-600'} relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}>
							<span
								aria-hidden="true"
								className={`${props.color ? 'translate-x-6' : 'translate-x-0'} pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
							/>
						</Switch>
						<p className="">Change Color</p>
					</div>
				</div>
			</div>
			
			<div className="w-100 flex justify-center">
				<button className="bg-green-500 hover:bg-green-700 w-[125px] rounded-sm" onClick={() => props.close()}>
					Save
				</button>
			</div>
		</div>
	);
}
