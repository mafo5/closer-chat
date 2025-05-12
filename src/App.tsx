import { useEffect, useState } from 'react'
import './App.css'
import chats from './assets/chats.json'
import { SystemMessage } from './SystemMessage'
import type { Chat } from './chat'
import { TextMessage } from './TextMessage'

function App() {
  const [visibleChats, setVisibleChats] = useState(0)
  const [keysPressed, setKeysPressed] = useState(0)

  useEffect(() => {
    const onEnterPressed = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        setVisibleChats((prev) => {
          if (prev >= chats.length) {
            return 0
          }
          return prev + 1
        })
        setKeysPressed(0);
      }
    }

    const onKeyPressed = (event: KeyboardEvent) => {
      if (event.key !== 'Enter') {
        setKeysPressed((prev) => {
          return prev + 1
        })
      }
    };


    document.addEventListener('keydown', onEnterPressed);
    document.addEventListener('keydown', onKeyPressed);
    return () => {
      document.removeEventListener('keydown', onEnterPressed);
      document.removeEventListener('keydown', onKeyPressed);
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
              return <SystemMessage
                key={index}
                chat={chat as Chat}
              />
            case 'text':
              return <TextMessage
                key={index}
                chat={chat as Chat}
                keysPressed={visibleChats - 1 === index ? keysPressed : -1}
              />
            default:
              return null
          }
        })
      }
    </>
  )
}

export default App
