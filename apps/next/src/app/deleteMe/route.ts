/* eslint-disable no-console */
import { Server } from 'Socket.IO'
import { Rewind } from 'lucide-react'
import { NextRequest, NextResponse } from 'next/server'

// import { Server as SocketIOServer, Socket } from 'socket.io'

// declare module 'next/server' {
// 	interface NextResponse {
// 		socket: {
// 			server: {
// 				io?: Server;
// 			};
// 		};
// 	}
// }

let io: Server

export const GET = (req: NextRequest, res: NextResponse): Response => {
	if (io != null) {
		console.log('Socket is already running')
	} else {


		console.log('Socket is initializing')
		// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
		// @ts-ignore
		io = new Server()
		// console.log(io)

		io.on('connection', socket => {
			console.log('Connection made', socket.id)
			socket.on('input-change', msg => {
				socket.broadcast.emit('update-input', msg)
			})
		})
	}
	const response = new Response(`40${JSON.stringify({sid: "1234"})}`)
	return response
}

export const dynamic = 'force-dynamic'