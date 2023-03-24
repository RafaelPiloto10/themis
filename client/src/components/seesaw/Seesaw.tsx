export default function Seesaw(props: { color: boolean, left: string[], right: string[] }): JSX.Element {
	const color = props.color ? "border-blue-500" : "border-yellow-500";

	return (
		<div className="w-full h-full flex justify-center mt-3 border-box p-2">
			<div className="w-full h-full grid gap-8 grid-cols-2">
				<div className={`grid grid-auto-rows border-2 ${color} rounded-sm w-full h-full`}>
					{props.left.map((word, i) => {
						return (
							<p key={i}>{word}</p>
						);
					})}
				</div>

				<div className={`grid grid-auto-rows border-2 ${color} rounded-sm w-full h-full`}>
					{props.right.map((word, i) => {
						return (
							<p key={i}>{word}</p>
						);
					})}
				</div>
			</div>
		</div>
	);
}
