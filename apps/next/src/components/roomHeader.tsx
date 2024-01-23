import { useSocket } from "@/hooks/useSocket";
import { ChangeEvent } from "react";
import RoomSettings from "./roomSettings";
import { Input } from "./ui/input";
import RoomList from "./roomList";

interface RoomHeaderProps {
	socket: ReturnType<typeof useSocket>;
}
export default function RoomHeader(props: RoomHeaderProps) {
	const { room, methods } = props.socket

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		methods.changeName(e.target.value)
	}

	return (
		<div>
			<div className='w-full grid grid-cols-[auto_200px_min-content] gap-2 py-2'>
				<h1 className='font-bold text-lg my-auto'>
					{room?.id ?? 'Loading...'}
				</h1>
				<div>
					<Input width={'200'} placeholder='Enter your name...' id="name" onChange={onChange}></Input>
				</div>
				<RoomSettings socket={props.socket} />
			</div>
			<RoomList socket={props.socket}></RoomList>
		</div>
	)
}