/* eslint-disable no-console */
"use client"
import { DeckCard } from '@/components/deckCard';
import { useSocket } from '@/hooks/useSocket';
import { ChangeEvent } from 'react';

interface PageProps {
	params: {
		roomId: string;
	};
}

export default function RoomPage({ params }: PageProps) {
	const { roomId } = params;
	const { socket, room, deck, isActiveUser } = useSocket(roomId);

	const loading = room == null

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		socket?.emit('changeName', e.target.value);
	};
	
	if(loading) {
		return (
			<h1>Loading</h1>
		)
	}

	return (
		<div className='w-full p-2'>
			<div className='w-full flex justify-between h-full'>
				<h1 className='font-bold text-lg'>
					{room?.id ?? 'Loading...'}
				</h1>
				<div>
					{/* Replace this with the shadcn component */}
					<input placeholder='Enter your name...' id="name" onChange={onChange}></input>
				</div>
			</div>
			{
				isActiveUser && (
					<div className='flex justify-around'>
						{deck?.cards.map((card, i) => (
							<DeckCard key={i} card={card.toString()} />
						))}
					</div>
				)
			}
		</div>
	);
}