import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "./ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { useSocket } from "@/hooks/useSocket";
import { FrameIcon } from "@radix-ui/react-icons";

interface RoomSettingsProps {
	socket: ReturnType<typeof useSocket>;
}

export default function RoomSettings(props: RoomSettingsProps) {
	const availableDecks = props.socket?.room?.availableDecks ?? []
	const selectedDeckIndex = props.socket?.room?.selectedDeck ?? 0


	const handleChangeDeck = (deckIndex: number) => {
		props.socket.methods.changeDeck(deckIndex)
	}

	const selectedDeck = availableDecks[selectedDeckIndex]
	const selectedDeckName = `${selectedDeck?.name}`

	return (
		<>
			<Drawer shouldScaleBackground>
				<DrawerTrigger>
					<Button variant={'ghost'}><FrameIcon /></Button>
				</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>Room settings</DrawerTitle>
						<DrawerDescription>Changing these will instantly update the room 👍</DrawerDescription>
					</DrawerHeader>
					<div className="p-4">
						<Select onValueChange={handleChangeDeck}>
							<SelectTrigger>
								<SelectValue placeholder={selectedDeckName}>{selectedDeckName}</SelectValue>
							</SelectTrigger>
							<SelectContent>
								{availableDecks?.map((deck, i) => (
									<SelectItem key={i} value={i}>{`${deck.name} (${deck.cards.join(',')})`}</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<DrawerFooter>
						<DrawerClose>
							<Button>Close</Button>
						</DrawerClose>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	)
}