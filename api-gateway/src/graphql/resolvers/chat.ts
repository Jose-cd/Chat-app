import { ChatService } from "#root/adapters/ChatService";
import { Query, Resolver } from "type-graphql";
import { Message } from "../entitites/Message";

@Resolver()
export class ChatResolver {
  @Query((returns) => [Message], { description: "returns list of messages" })
  async getMessages() {
    const response = await ChatService.getMsgList();

    return response;
  }
}
