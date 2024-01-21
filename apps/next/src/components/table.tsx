import { FrontendRoom } from "../../backend/roomManager";
import { DeckCard } from "./deckCard";

interface TableProps {
	room: FrontendRoom;
}

export default function Table(props: TableProps) {
	const { members, selectedDeck, availableDecks } = props.room
	const cardsOnTable = members
		.filter(m => m.card != null)

	const deck = availableDecks[selectedDeck]

	return (
		<div>
			<div className="flex justify-around w-full h-full">
				{cardsOnTable.map((card, i) => {
					const index = card?.card ?? 0
					const cardValue = deck.cards[index]
				
					return (
							<div className="text-center my-auto" key={i}>
								<DeckCard card={card.hidden ? '' : cardValue} />
								<p className="mt-2">{card.name}</p>
							</div>
						)
					})
				}
			</div>
		</div>
	);
}