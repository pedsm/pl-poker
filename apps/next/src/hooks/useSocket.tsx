import { useCallback, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

export function useSocket() {
	const [socket, setSocket] = useState<Socket | null>(null);

	useEffect(() => {
		if(socket != null) {
			return
		}
		const newSocket = io();

		newSocket?.on('connect', () => {
			// eslint-disable-next-line no-console
			console.log('Connected', newSocket.id)
			setSocket(newSocket);
		})

		return () => {
			newSocket.close();
		};
	}, []);

	return socket;
}