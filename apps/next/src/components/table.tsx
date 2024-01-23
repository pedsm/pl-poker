import { PersonIcon } from "@radix-ui/react-icons";
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
				{cardsOnTable.map((card) => {
					const index = card?.card ?? 0
					const cardValue = deck.cards[index]
					const key = `${card.id}-${index}-${card.hidden}`
				
					return (
							<div className="flex flex-col justify-center items-center my-auto" key={key}>
								<DeckCard card={card.hidden ? '' : cardValue} />
								<p className="mt-2 font-bold text-center truncate w-[140px]"><PersonIcon className="inline"/> {card.name}</p>
							</div>
						)
					})
				}
			</div>
		</div>
	);
}