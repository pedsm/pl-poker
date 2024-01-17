import { useSocket } from "@/hooks/useSocket";
import { ChangeEvent } from "react";
import RoomSettings from "./roomSettings";

interface RoomHeaderProps {
	socket: ReturnType<typeof useSocket>;
}
export default function RoomHeader(props: RoomHeaderProps) {
	const { room, methods } = props.socket

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		methods.changeName(e.target.value)
	}

	return (
		<div className='w-full grid grid-cols-[auto_min-content_min-content] py-2'>
			<h1 className='font-bold text-lg'>
				{room?.id ?? 'Loading...'}
			</h1>
			<div>
				{/* Replace this with the shadcn component */}
				<input placeholder='Enter your name...' id="name" onChange={onChange}></input>
			</div>
			<RoomSettings socket={props.socket} />
		</div>
	)
}