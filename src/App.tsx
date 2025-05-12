import { useEffect, useState } from 'react'
import './App.css'
import chats from './assets/chats.json'
import { SystemMessage } from './SystemMessage'
import type { Chat } from './chat'
import { TextMessage } from './TextMessage'

function App() {
  const [visibleChats, setVisibleChats] = useState(0)

  useEffect(() => {
    const onEnterPressed = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        setVisibleChats((prev) => {
          if (prev >= chats.length) {
            return 0
          }
          return prev + 1
        })
      }
    }
    document.addEventListener('keydown', onEnterPressed);
    return () => {
      document.removeEventListener('keydown', onEnterPressed);
    }
  }, []);

  return (
    <>
      {
        chats.map((chat, index) => {
          if (visibleChats === 0) {
            return null
          }
          if (index >= visibleChats) {
            return null
          }
          switch (chat.type) {
            case 'system':
              return <SystemMessage key={index} chat={chat as Chat} />
            case 'text':
              return <TextMessage key={index} chat={chat as Chat} />
            default:
              return null
          }
        })
      }
    </>
  )
}

export default App
