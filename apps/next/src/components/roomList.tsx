import { useSocket } from "@/hooks/useSocket";
import { CheckIcon, EyeOpenIcon, PersonIcon } from "@radix-ui/react-icons";

interface RoomHeaderProps {
	socket: ReturnType<typeof useSocket>;
}

export default function RoomList(props: RoomHeaderProps) {
	const users = props.socket.room?.members ?? [];

	const usersWithName = users.filter(u => u.name != '')
	const watchCount = users.length - usersWithName.length

	return (
		<div className="ml-auto w-[180px]"> 
			{watchCount > 0 && (
				<p><EyeOpenIcon className="inline" /> {watchCount} Watching</p>
			)}
			{usersWithName.map((user, i) => (
				<p key={i}>{user.card == null 
					? (<PersonIcon className="inline"/>)
					: (<CheckIcon className="inline text-green-600"/>)
				} {user.name}</p>
			))}
		</div>
	)
	
}