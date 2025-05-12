import type { FunctionComponent } from "react";
import type { Chat } from "./chat";

export const SystemMessage: FunctionComponent<{ chat: Chat }> = ({ chat }) => {
    const color = chat.participant === 0 ? "text-blue-500" : "text-green-500";
    return (
        <div className="flex flex-col items-start p-4">
            <div className={[color, 'font-bold'].join(' ')}>
                <p>{chat.name}: {chat.message}</p>
            </div>
        </div>
    )
}
