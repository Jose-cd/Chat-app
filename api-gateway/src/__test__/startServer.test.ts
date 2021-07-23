import { ApolloServer } from "apollo-server-express";
import startserver from "../server/startServer";

test("Server started successfully", async () => {
  let server: ApolloServer;
  try {
    server = await startserver();
  } catch (err) {
    console.log(err);
  }

  const GET_MSGS = `
  {
    getMessages{
      id
      username
      message
      createdAt
    }
  }
  `;

  // const response = await server.executeOperation({ query: GET_MSGS });

  // console.log(response);
});
