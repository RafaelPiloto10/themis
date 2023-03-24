import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';

import io from 'socket.io-client';
import { Socket } from 'socket.io-client';
import Seesaw from './components/seesaw/Seesaw';

function App() {
	const [isConnected, setIsConnected] = useState(false);
	const [leftWords, setLeftWords] = useState<string[]>([]);
	const [rightWords, setRightWords] = useState<string[]>([]);

	const [color, setColor] = useState(window.localStorage.getItem("color") === "true");
	const [inverted, setInverted] = useState(window.localStorage.getItem("inverted") === "true");

	const [socket, setSocket] = useState<Socket | null>(null);

	useEffect(() => {
		const s = io(`ws://127.0.0.1:8080`);

		s.on('data', (data) => {
			setLeftWords(data[0]);
			setRightWords(data[1]);
		});

		s.on('connect', () => {
			setIsConnected(true);
		});

		s.on('disconnect', () => {
			setIsConnected(false);
		});

		setSocket(s);

		return () => {
			s.close();
		}
	}, [setSocket]);

	return (
		<div className="App flex flex-col">
			<Navbar connected={isConnected} color={color} setColor={setColor} inverted={inverted} setInverted={setInverted} />
			<div className='flex-grow'>
				<Seesaw color={color} left={inverted ? rightWords : leftWords} right={inverted ? leftWords : rightWords} />
			</div>
			<h1 className="text-xl">stephaniebphotos.com/seesaw</h1>
		</div>
	);
}

export default App;
