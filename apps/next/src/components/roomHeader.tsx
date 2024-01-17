import { useSocket } from "@/hooks/useSocket";
import { ChangeEvent } from "react";

interface RoomHeaderProps {
	room: ReturnType<typeof useSocket>['room'];
	methods: ReturnType<typeof useSocket>['methods'];
}
export default function RoomHeader(props: RoomHeaderProps) {
	const { room, methods } = props

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		methods.changeName(e.target.value)
	}

	return (
		<div className='w-full flex justify-between py-2'>
			<h1 className='font-bold text-lg'>
				{room?.id ?? 'Loading...'}
			</h1>
			<div>
				{/* Replace this with the shadcn component */}
				<input placeholder='Enter your name...' id="name" onChange={onChange}></input>
			</div>
		</div>
	)
}