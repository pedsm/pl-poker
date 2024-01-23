import { cva } from "class-variance-authority"

interface DeckCardProps {
	card: string | number;
	active?: boolean;
	onClick?: () => void;
}
export function DeckCard(props: DeckCardProps) {
	const intractable = props.onClick != null

	const card = cva(['animate-[throw-in]','font-bold w-[90px] h-[130px] bg-white rounded-md shadow-md flex justify-center items-center relative'], {
		variants: {
			active: {
				true: ['shadow-lg translate-y-[-0.3rem]']
			},
			intractable: {
				true: ['cursor-pointer hover:shadow-lg hover:translate-y-[-0.3rem]', 'duration-75'],
				false: ['cursor-default', 'duration-500']
			}
		}
	})

	return (
		<div onClick={props.onClick} className=
		{card({active: props.active, intractable})}>
			{props.active && (
				<>
				<div className="bg-blue-700 w-2 h-2 rounded-full absolute top-2 right-2"></div>
				<div className="bg-blue-700 motion-safe:animate-ping w-2 h-2 rounded-full absolute top-2 right-2"></div>
				</>
			)}
			{props.card}
		</div>
	)

}