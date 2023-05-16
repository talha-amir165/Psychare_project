import GenericService from "./GenericService";
class ChatService extends GenericService {
    addchat = (data) => this.post("chats", data);
    getchatbysingleid = (id) => this.get("chats/" + id);
    getchatbydoubleid = (id, id2) => this.get("chats/" + id + "/" + id2);
}

let chatService = new ChatService();
export default chatService;