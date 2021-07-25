require("dotenv").config();
import "reflect-metadata";
import { initConnection } from "#root/db/connection";
import startServer from "#root/server/startServer";

//comment
initConnection()
  .then(() => {
    startServer();
  })
  .catch((err) => console.log(err));
