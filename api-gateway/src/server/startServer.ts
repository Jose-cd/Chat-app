require("dotenv").config();
import express from "express";
import { ApolloServer } from "apollo-server-express";
import formatGraphQLErrors from "./formatGraphQLErrors";
import { schema } from "#root/graphql";
import cookieParser from "cookie-parser";
import cors from "cors";
import injectSession from "#root/server/middleware/injectSession";
const PORT = parseInt(process.env.PORT as string, 10);

const startserver = async () => {
  const apolloServer = new ApolloServer({
    context: (a) => a,
    formatError: formatGraphQLErrors,
    schema: await schema(),
  });

  const app = express();

  app.use(cookieParser());

  app.use(
    cors({
      credentials: true,
      origin: (origin, cb) => cb(null, true),
    })
  );

  // middleware to get current user session
  app.use(injectSession);

  apolloServer.applyMiddleware({ app, cors: false, path: "/graphql" });

  app.listen(PORT, "0.0.0.0", () => {
    console.info(`API gateway running on port ${PORT}`);
  });
};

export default startserver;
