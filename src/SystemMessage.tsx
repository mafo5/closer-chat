import type { FunctionComponent, HTMLAttributes } from "react";
import type { Chat } from "./chat";

export const SystemMessage: FunctionComponent<{ chat: Chat } & HTMLAttributes<'div'>> = ({ chat, className }) => {
    const color = chat.participant === 0 ? "text-blue-500" : "text-green-500";
    return (
        <div className={["flex flex-col p-4", className].join(' ')}>
            <div className={[color, 'font-bold'].join(' ')}>
                <p>{chat.name} {chat.message}</p>
            </div>
        </div>
    )
}
