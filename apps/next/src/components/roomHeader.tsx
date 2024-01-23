import { useSocket } from "@/hooks/useSocket";
import { toast } from 'sonner'
import { ChangeEvent } from "react";
import RoomSettings from "./roomSettings";
import { Input } from "./ui/input";
import RoomList from "./roomList";
import { Link2Icon } from "@radix-ui/react-icons";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface RoomHeaderProps {
	socket: ReturnType<typeof useSocket>;
}
export default function RoomHeader(props: RoomHeaderProps) {
	const { room, methods } = props.socket

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		methods.changeName(e.target.value)
	}

	const copyToClipboard = () => {
		navigator.clipboard.writeText(window.location.href);
		toast.info('Room link Copied to clipboard.')
	}

	return (
		<div>
			<div className='w-full grid grid-cols-[auto_200px_min-content] gap-2 py-2'>
				<TooltipProvider>
					<Tooltip delayDuration={100}>
						<TooltipTrigger asChild>
							<h1 className='font-bold text-lg my-auto cursor-pointer' onClick={copyToClipboard}>
								{room?.id ?? 'Loading...'} <Link2Icon className='inline' />
							</h1>
						</TooltipTrigger>
						<TooltipContent align="start" >
							<p>Click to copy the room link to the clipboard.</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<div>
					<Input width={'200'} placeholder='Enter your name...' id="name" onChange={onChange}></Input>
				</div>
				<RoomSettings socket={props.socket} />
			</div>
			<RoomList socket={props.socket}></RoomList>
		</div>
	)
}