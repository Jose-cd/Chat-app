import { Message } from "#root/graphql/entitites/Message";
import got from "got";

const CHAT_SERVICE_URI = <string>process.env.CHAT_SERVICE_URI;
export class ChatService {
  static async getMsgList() {
    const body: Message[] = await got.get(`${CHAT_SERVICE_URI}/message`).json();

    return body;
  }
}
