/* eslint-disable no-console */
"use client"
import RoomControls from '@/components/controls';
import { DeckCard } from '@/components/deckCard';
import RoomHeader from '@/components/roomHeader';
import Table from '@/components/table';
import { useSocket } from '@/hooks/useSocket';
import { ChangeEvent } from 'react';

interface PageProps {
	params: {
		roomId: string;
	};
}

export default function RoomPage({ params }: PageProps) {
	const { roomId } = params;
	const { socket, room, deck, isActiveUser, methods, me } = useSocket(roomId);

	const loading = room == null


	
	if(loading) {
		return (
			<h1>Loading</h1>
		)
	}

	return (
		<div className='w-full p-2 h-full grid grid-rows-[1fr_min-content]'>
			<div className='grid grid-rows-[min-content_auto_min-content]'>
				<RoomHeader room={room} methods={methods} />
				<Table room={room} />
				<RoomControls methods={methods} me={me} />
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