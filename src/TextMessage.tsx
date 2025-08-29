import type { FunctionComponent, HTMLAttributes } from "react";
import type { Chat } from "./chat";

export const TextMessage: FunctionComponent<{ chat: Chat, keysPressed: number } & HTMLAttributes<'div'>> = ({ chat, keysPressed, className }) => {

    const color = chat.participant === 0 ? "text-blue-500" : "text-green-500";
    return (
        <div className={["flex flex-col p-4", className].join(' ')}>
            <div className={[color, 'font-bold'].join(' ')}>
                {chat.name}
            </div>
            <div>
                <p style={{ whiteSpace: 'pre-wrap' }}>{chat.message.split('').filter((character, index) => keysPressed < 0 ? true : (index < keysPressed || (['\n'].includes(character) && index < keysPressed + 1))).join('')}</p>
            </div>
        </div>
    )
}