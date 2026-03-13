import { useChatStore } from "../store/chatStore";
import { TChatMessage } from "../types/chatTypes";
import useUpdateUserAIChat from "./user/useUpdateUSerAIChat";

export default function useUpdateChat(id: string, message: TChatMessage) {
    const {mutate: updateUserChat} = useUpdateUserAIChat(id);
    const updateGuestChat = useChatStore(state=>state.setHistory);

    if (id === "guest") {
        return updateGuestChat(message)
    }
    return updateUserChat(message)

}