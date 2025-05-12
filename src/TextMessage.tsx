import type { FunctionComponent } from "react";
import type { Chat } from "./chat";

export const TextMessage: FunctionComponent<{ chat: Chat, keysPressed: number }> = ({ chat, keysPressed }) => {

    const color = chat.participant === 0 ? "text-blue-500" : "text-green-500";
    return (
        <div className="flex flex-col items-start p-4">
            <div className={[color, 'font-bold'].join(' ')}>
                {chat.name}:
            </div>
            <div>
                <p>{chat.message.split('').filter((_, index) => keysPressed < 0 ? true : index < keysPressed).join('')}</p>
            </div>
        </div>
    )
}