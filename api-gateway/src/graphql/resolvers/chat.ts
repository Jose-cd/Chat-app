import { ChatService } from "#root/adapters/ChatService";
import {
  Arg,
  Args,
  Field,
  InputType,
  Mutation,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";
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
  async postMessage(
    @Arg("MessageInput") { msg, user }: MessageInput,
    @PubSub() pubSub: PubSubEngine
  ) {
    const response = await ChatService.postMsg({ msg, user });
    // here we can trigger subscriptions topics
    const payload: Message = response;
    await pubSub.publish("MESSAGES", payload);
    return response;
  }

  //Subscriptions
  @Subscription({ topics: "MESSAGES" })
  newMessages(@Root() messagePayload: Message): Message {
    return {
      ...messagePayload,
    };
  }
}
