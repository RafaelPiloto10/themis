export default function Seesaw(props: { color: boolean, left: string[], right: string[] }): JSX.Element {
	const color = props.color ? "border-red-500" : "border-green-500";

	return (
		<div className="w-full flex justify-center mt-5">
			<div className="grid gap-32 grid-cols-2">
				<div className={`grid grid-auto-rows border-2 ${color} rounded-sm w-[500px] h-[500px]}`}>
					{props.left.map((word, i) => {
						return (
							<p key={i}>{word}</p>
						);
					})}
				</div>

				<div className={`grid grid-auto-rows border-2 ${color} rounded-sm w-[500px] h-[500px]`}>
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
