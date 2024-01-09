/* eslint-disable no-console */
"use client"
import { useSocket } from '@/hooks/useSocket';

interface PageProps {
	params: {
		roomId: string;
	};
}

export default function RoomPage({ params }: PageProps) {
	const socket = useSocket()

	return (
		<div>
			Page {params.roomId} {' '}

			id: {socket?.id ?? '-'}
		</div>
	)
}