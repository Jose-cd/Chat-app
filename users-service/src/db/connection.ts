import { createConnection, Connection } from "typeorm";
import User from "./entities/User";

let connection: Connection;

export const initConnection = async () => {
  connection = await createConnection({
    entities: [User],
    type: "mysql",
    url: process.env.USERS_SERVICE_DB_URL,
  });
};

const getConnection = () => connection;

export default getConnection;
