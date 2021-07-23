require("dotenv").config();
import "reflect-metadata";
import { initConnection } from "./db/connection";
import startServer from "./server/startServer";

/**
 * Starts db connection
 * then express server
 */
initConnection().then(() => {
  startServer();
});
