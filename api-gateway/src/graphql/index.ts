import { buildSchema } from "type-graphql";
import { UserSessionsResolver } from "./resolvers/userSessions";

export const schema = async () =>
  await buildSchema({
    resolvers: [UserSessionsResolver],
  });
