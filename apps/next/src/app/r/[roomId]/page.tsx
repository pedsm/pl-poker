/* eslint-disable no-console */
"use client"
import RoomControls from '@/components/controls';
import { DeckCard } from '@/components/deckCard';
import RoomHeader from '@/components/roomHeader';
import Table from '@/components/table';
import { useSocket } from '@/hooks/useSocket';

interface PageProps {
	params: {
		roomId: string;
	};
}

export default function RoomPage({ params }: PageProps) {
	const { roomId } = params;
	const socket = useSocket(roomId);
	const { room, deck, isActiveUser, methods, me } = socket

	const loading = room == null
	
	if(loading) {
		return (
			<h1>Loading</h1>
		)
	}

	return (
		<div className='bg-white w-full p-2 h-full grid grid-rows-[1fr_min-content]'>
			<div className='grid grid-rows-[min-content_auto_min-content]'>
				<RoomHeader socket={socket}/>
				<Table room={room} />
				<RoomControls socket={socket} />
			</div>
			{
				isActiveUser && (
					<div className='flex justify-around'>
						{deck?.cards.map((card, i) => (
							<DeckCard key={i} onClick={() => methods.pickCard(i)} card={card.toString()} />
						))}
					</div>
				)
			}
		</div>
	);
}