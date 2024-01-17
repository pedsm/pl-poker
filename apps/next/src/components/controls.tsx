import { useSocket } from "@/hooks/useSocket"
import { Button } from "./ui/button";

interface RoomControlsProps {
	socket: ReturnType<typeof useSocket>;
}
export default function RoomControls(props: RoomControlsProps) {
	const { pickCard, flipAll, flipMyCard, clearTable } = props.socket.methods
	const isMyCardUp = !props.socket.me?.hidden
	const activeUser = props.socket.isActiveUser
	
	if(activeUser == false) {
		return(
			<span></span>
		)
	}

	return (
		<div className="flex justify-around py-2">
			<Button onClick={() => pickCard(null)}>Pick up card</Button>
			<Button onClick={() => flipMyCard()}>{isMyCardUp ? 'Hide' : 'Show'} my card</Button>
			<Button onClick={() => flipAll()}>Flip all cards</Button>
			<Button onClick={() => clearTable()}>Clear table</Button>
		</div>
	)
}