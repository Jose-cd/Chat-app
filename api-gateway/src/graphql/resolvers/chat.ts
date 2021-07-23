import { ChatService } from "#root/adapters/ChatService";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Message } from "../entitites/Message";

@InputType()
class MessageInput {
  @Field()
  msg: string;
  @Field()
  user: string;
}

@Resolver()
export class ChatResolver {
  // Queries

  @Query((returns) => [Message], { description: "Returns list of messages" })
  async getMessages() {
    const response = await ChatService.getMsgList();

    return response;
  }

  // Mutations
  @Mutation((of) => Message, { description: "Post a Message" })
  async postMessage(@Arg("MessageInput") { msg, user }: MessageInput) {
    const response = await ChatService.postMsg({ msg, user });

    return response;
  }
}
