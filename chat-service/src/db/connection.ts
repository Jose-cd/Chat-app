import { createConnection, Connection } from "typeorm";
import accessEnv from "../helpers/accessEnv";
import Chat from "./entities/Chat";

// save db connection
let connection: Connection;

/**
 * Returns db connection
 */
export const initConnection = async () => {
  try {
    connection = await createConnection({
      entities: [Chat],
      type: "mysql",
      url: accessEnv("CHAT_SERVICE_DB_URL", ""),
    });
  } catch (err) {
    console.log(err, process.env.CHAT_SERVICE_DB_URL);
  }
};

// export db connection
const getConnection = () => connection;

export default getConnection;
