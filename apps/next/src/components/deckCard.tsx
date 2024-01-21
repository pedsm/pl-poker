import { cn } from "@/lib/utils";

interface DeckCardProps {
	card: string | number;
	onClick?: () => void;
}
export function DeckCard(props: DeckCardProps) {
	const intractable = props.onClick != null

	cn
	return (
		<div onClick={props.onClick} className=
		{cn('font-bold duration-75 w-[90px] h-[130px] bg-white rounded-md shadow-md flex justify-center items-center',
		intractable ? 'cursor-pointer hover:shadow-lg hover:translate-y-[-0.3rem]' : 'cursor-default'
		)}>
			{props.card}
		</div>
	)

}