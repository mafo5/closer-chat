import { useEffect, useState } from 'react'
import './App.css'
import chats from './assets/chats.json'
import { SystemMessage } from './SystemMessage'
import type { Chat } from './chat'
import { TextMessage } from './TextMessage'

function App() {
  const [visibleChats, setVisibleChats] = useState(0)
  const [keysPressed, setKeysPressed] = useState(0)

  const typingSpeed = 100; // 1 second
  const messageDelay = 1000; // 1 second
  const autoTyping = window.location.search.includes('typing=auto');

  useEffect(() => {
    const removals: (() => void)[] = [];

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
    removals.push(() => document.removeEventListener('keydown', onEnterPressed));
    removals.push(() => document.removeEventListener('keydown', onKeyPressed));

    document.addEventListener('keydown', onEnterPressed);
    document.addEventListener('keydown', onKeyPressed);
    return () => {
      removals.forEach((remove) => remove());
    }
  }, []);

  useEffect(() => {
    const removals: (() => void)[] = [];

    if (autoTyping) {
      let lastMessageChange = new Date().getTime();
      const interval = setInterval(() => {
        const currentTime = new Date().getTime();
        if (visibleChats === 0) {
          setVisibleChats(1);
          lastMessageChange = currentTime;
          return
        }
        const currentChat = chats[visibleChats - 1];
        const requiredKeyStrokes = currentChat.type.toLowerCase() === 'system' ? 0 : currentChat.message.length;
        const difference = currentTime - lastMessageChange;

        console.log('state', { currentType: currentChat.type, currentMessage: currentChat.message, difference, keysPressed, requiredKeyStrokes, visibleChats });

        if (keysPressed < requiredKeyStrokes) {
          if (difference > typingSpeed) {
            setKeysPressed((prev) => {
              return prev + 1
            })
            lastMessageChange = currentTime;
          }
        } else if (difference > messageDelay) {
          setVisibleChats((prev) => {
            return prev + 1
          })
          setKeysPressed(0);
          lastMessageChange = currentTime;
        }

      }, 10);
      removals.push(() => clearInterval(interval));
    }
    return () => {
      removals.forEach((remove) => remove());
    }
  }, [autoTyping, typingSpeed, keysPressed, visibleChats]);

  return (
    <div className="grid">
      {
        chats.map((chat, index) => {
          if (visibleChats === 0) {
            console.log(`visibleChats is 0 from ${chats.length}, skipping rendering`);
            return null
          }
          if (index >= visibleChats) {
            console.log(`index ${index} is greater than visibleChats ${visibleChats}, skipping rendering`);
            return null
          }
          switch (chat.type.toLowerCase()) {
            case 'system':
              return <SystemMessage
                className={chat.participant ? 'items-end' : 'items-start'}
                key={index}
                chat={chat as Chat}
              />
            case 'text':
              return <TextMessage
                className={chat.participant ? 'items-end' : 'items-start'}
                key={index}
                chat={chat as Chat}
                keysPressed={visibleChats - 1 === index ? keysPressed : -1}
              />
            default:
              return null
          }
        })
      }
    </div>
  )
}

export default App
