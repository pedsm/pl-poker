import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { FrontendRoom } from "../../backend/roomManager";


export function useSocket(roomId: string) {
	const [socket, setSocket] = useState<Socket | null>(null);
	const [room, setRoom] = useState<FrontendRoom | null>(null);

	useEffect(() => {
		if(socket != null) {
			return
		}
		const newSocket = io();

		newSocket?.on('connect', () => {
			// eslint-disable-next-line no-console
			console.log('Connected', newSocket.id)
			setSocket(newSocket);
			newSocket.emit('join', roomId)
		})

		newSocket?.on('poll', (data) => {
			// eslint-disable-next-line no-console
			console.log('poll', data)
			setRoom(data)
		})

		return () => {
			newSocket.close();
		};
	}, []);

	const me = room?.members.find(m => m.id === socket?.id)

	return {
		socket,
		isActiveUser: me?.name != '',
		deck: room?.availableDecks[room.selectedDeck],
		room
	};
}