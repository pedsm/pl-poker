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
import { useTheme } from "next-themes";

interface RoomSettingsProps {
	socket: ReturnType<typeof useSocket>;
}

function capitalise(str: string|undefined) {
	if(str == null) {
		return 'Unknown'
	}
	return str[0].toUpperCase() + str.slice(1, str.length)
}


export default function RoomSettings(props: RoomSettingsProps) {
	const availableDecks = props.socket?.room?.availableDecks ?? []
	const selectedDeckIndex = props.socket?.room?.selectedDeck ?? 0
	const {theme, themes, setTheme} = useTheme()


	const handleChangeDeck = (deckIndex: string) => {
		props.socket.methods.changeDeck(+deckIndex)
	}

	const handleThemeSelection = (t: string) => {
		setTheme(t)
	}

	const selectedDeck = availableDecks[selectedDeckIndex]
	const selectedDeckName = `${selectedDeck?.name}`

	return (
		<>
			<Drawer shouldScaleBackground>
				<DrawerTrigger asChild>
					<Button variant={'ghost'}><FrameIcon /></Button>
				</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>Room settings</DrawerTitle>
						<DrawerDescription>Changing these will instantly update the room 👍</DrawerDescription>
					</DrawerHeader>
					<div className="px-4">
						<Select onValueChange={handleChangeDeck}>
							<SelectTrigger>
								<SelectValue placeholder={selectedDeckName}>{selectedDeckName}</SelectValue>
							</SelectTrigger>
							<SelectContent>
								{availableDecks?.map((deck, i) => (
									<SelectItem key={i} value={i.toString()}>{`${deck.name} (${deck.cards.join(',')})`}</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<DrawerHeader>
						<DrawerTitle>User settings</DrawerTitle>
						<DrawerDescription>
							These one&#39;s will only change for you
						</DrawerDescription>
					</DrawerHeader>
					<div className="px-4">
						<Select onValueChange={handleThemeSelection}>
							<SelectTrigger>
								<SelectValue placeholder={capitalise(theme)}>{capitalise(theme)}</SelectValue>
							</SelectTrigger>
							<SelectContent>
								{themes?.map((t) => (
									<SelectItem key={t} value={t}>{`${capitalise(t)}`}</SelectItem>
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