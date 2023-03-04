export default function Seesaw(props: { left: string[], right: string[] }): JSX.Element {
	return (
		<div className="w-full h-full flex items-center justify-center">
			<div className="grid gap-32 grid-cols-2">
				<div className="grid grid-auto-rows">
					{props.left.map((word, i) => {
						return (
							<p key={i}>{word}</p>
						);
					})}
				</div>

				<div className="grid grid-auto-rows">
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
