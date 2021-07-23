import { buildSchema } from "type-graphql";
import { ChatResolver } from "./resolvers/chat";
import { UserSessionsResolver } from "./resolvers/userSessions";

export const schema = async () =>
  await buildSchema({
    dateScalarMode: "isoDate",
    resolvers: [UserSessionsResolver, ChatResolver],
  });
