import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority"

interface DeckCardProps {
	card: string | number;
	active?: boolean;
	onClick?: () => void;
}
export function DeckCard(props: DeckCardProps) {
	const intractable = props.onClick != null

	const card = cva([
		'bg-card text-card-foreground',
		'animate-[throw-in]', 'select-none', 'font-bold w-[90px] h-[130px] rounded-md shadow-md flex justify-center items-center relative',
	], {
		variants: {
			active: {
				true: ['shadow-lg translate-y-[-0.3rem]']
			},
			intractable: {
				true: ['cursor-pointer hover:shadow-lg hover:translate-y-[-0.3rem]', 'duration-75', 'ml-[-50px] md:ml-0'],
				false: ['cursor-default', 'duration-500']
			}
		}
	})

	return (
		<div onClick={props.onClick} className={card({active: props.active, intractable})}>
			<div className={cn("absolute top-2 left-2 text-xs rounded-xl", props.active ? 'text-accent' : '')}>{props.card}</div>
			{props.active && (
				<>
				<div className="bg-accent w-2 h-2 rounded-full absolute top-2 right-2"></div>
				<div className="bg-accent motion-safe:animate-ping w-2 h-2 rounded-full absolute top-2 right-2"></div>
				</>
			)}
			{props.card}
			<div className={cn("absolute bottom-2 right-2 text-xs rounded-xl origin-center rotate-180", props.active ? 'text-accent' : '')}>{props.card}</div>
		</div>
	)

}