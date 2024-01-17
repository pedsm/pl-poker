import { useSocket } from "@/hooks/useSocket"
import { Button } from "./ui/button";

interface RoomControlsProps {
	methods: ReturnType<typeof useSocket>['methods'];
	me: ReturnType<typeof useSocket>['me'];
}
export default function RoomControls(props: RoomControlsProps) {
	const { pickCard, flipAll, flipMyCard, clearTable } = props.methods
	const isMyCardUp = !props.me?.hidden

	return (
		<div className="flex justify-around py-2">
			<Button onClick={() => pickCard(null)}>Pick up card</Button>
			<Button onClick={() => flipMyCard()}>{isMyCardUp ? 'Hide' : 'Show'} my card</Button>
			<Button onClick={() => flipAll()}>Flip all cards</Button>
			<Button onClick={() => clearTable()}>Clear table</Button>
		</div>
	)
}