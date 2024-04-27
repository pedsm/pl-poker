/* eslint-disable no-console */
"use client"
import RoomControls from '@/components/controls';
import { DeckCard } from '@/components/deckCard';
import Notifier from '@/components/notifier';
import RoomHeader from '@/components/roomHeader';
import Table from '@/components/table';
import { Skeleton } from '@/components/ui/skeleton';
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

	if (loading) {
		return (
			<Skeleton className='w-[-webkit-fill-available] h-12 px-2 m-2 rounded-sm'></Skeleton>
		)
	}

	return (
		<>
			<Notifier></Notifier>
			<div className='w-full p-2 h-full grid grid-rows-[1fr_min-content]'>
				<div className='grid grid-rows-[min-content_auto_min-content]'>
					<RoomHeader socket={socket} />
					<Table room={room} />
					<RoomControls socket={socket} />
				</div>
				{/* Below should become the Hand component */}
				{
					isActiveUser && (
						<div className='flex justify-around gap-300 pl-[50px] md:pl-0 w-full'>
							{deck?.cards.map((card, i) => (
								<DeckCard active={me?.card == i} key={i} onClick={() => methods.pickCard(i)} card={card.toString()} />
							))}
						</div>
					)
				}
			</div>
		</>
	);
}