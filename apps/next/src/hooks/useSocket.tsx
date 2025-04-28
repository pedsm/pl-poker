import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { FrontendRoom } from "../backend/roomManager";
import { toast } from "sonner";

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

		newSocket?.on('notify', (data) => {
			const msg = data.msg as string
			toast.info(msg)
		})
		
		return () => {
			newSocket.close();
		};
	}, []);

	const me = room?.members.find(m => m.id === socket?.id)

	// Methods
	const pickCard = (cardIndex: number | null) => {
		socket?.emit('pickCard', cardIndex)
	}

	const flipAll = () => {
		socket?.emit('flipAll')
	}
	const clearTable = () => {
		socket?.emit('clearTable')
	}

	const changeDeck = (deckIndex: number) => {
		socket?.emit('changeDeck', deckIndex)
	}

	const flipMyCard = () => {
		socket?.emit('flipCard')
	}

	const changeName = (name: string) => {
		socket?.emit('changeName', name)
	}

	return {
		socket,
		isActiveUser: me?.name != '',
		deck: room?.availableDecks[room.selectedDeck],
		selectedDeck: room?.selectedDeck,
		availableDecks: room?.availableDecks,
		me,
		room,
		methods: {
			pickCard,
			flipAll,
			clearTable,
			changeDeck,
			flipMyCard,
			changeName
		}
	};
}