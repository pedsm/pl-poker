import { FrontendRoom } from "../../backend/roomManager";
import { DeckCard } from "./deckCard";

interface TableProps {
	room: FrontendRoom;
}

export default function Table(props: TableProps) {
	const { members } = props.room
	const cardsOnTable = members
		.filter(m => m.card != null)

	return (
		<div>
			<div className="flex justify-around w-full my-auto">
				{cardsOnTable.map((card, i) => (
					<div className="text-center" key={i}>
						<DeckCard card={card.hidden ? '' : card?.card?.toString() ?? ''} />
						<p className="mt-2">{card.name}</p>
					</div>
				))}
			</div>
		</div>
	);
}