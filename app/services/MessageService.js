import GenericService from "./GenericService";
class MessageService extends GenericService {
  addmessage = (data) => this.post("messages", data);
  getbychatid = (id) => this.get("messages/" + id);
}

let messageService = new MessageService();
export default messageService;
