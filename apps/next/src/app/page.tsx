"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useState, ChangeEvent, FormEvent } from 'react'

export default function Home() {
  const router = useRouter()
  const [roomId, setRoomId] = useState<string|null>(null)
  const [loading, setLoading] = useState(false)

  const buttonEnabled = roomId !== null && !loading

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setRoomId(event.target.value)
  }

  const openRoom = (e: FormEvent) => {
    setLoading(true)
    e.preventDefault()
    if(buttonEnabled) {
      router.push(`/r/${roomId}`)
    }
  }

  return (
      <Card className='w-96 align-middle my-auto'>
        <CardHeader className='font-bold'>Planning poker</CardHeader>
        <form onSubmit={openRoom}>
          <CardContent>
            <p>Room name</p>
            <Input onChange={onChange} placeholder='Just make one up'></Input>
          </CardContent>
          <CardFooter>
            <Button onClick={openRoom} disabled={!buttonEnabled} className='w-full'>
              {loading ? 'Loading your room...': 'Join room'}
            </Button>
          </CardFooter>
        </form>
      </Card>
  )
}
