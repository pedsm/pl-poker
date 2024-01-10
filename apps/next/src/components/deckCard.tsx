interface DeckCardProps {
	card: string;
	onClick?: () => void;
}
export function DeckCard(props: DeckCardProps) {


	return (
		<div onClick={props.onClick} className='font-bold duration-75 w-[90px] h-[130px] bg-white rounded-md shadow-md flex justify-center items-center hover:shadow-lg hover:translate-y-[-0.3rem]'>
			{props.card}
		</div>
	)

}