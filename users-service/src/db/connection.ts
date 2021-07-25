import accessEnv from "#root/helpers/accessEnv";
import { createConnection, Connection } from "typeorm";
import User from "./entities/User";
import UserSession from "./entities/UserSessions";

let connection: Connection;

export const initConnection = async () => {
  connection = await createConnection({
    entities: [User, UserSession],
    type: "mysql",
    url: accessEnv("USERS_SERVICE_DB_URL", ""),
  });
};

const getConnection = () => connection;

export default getConnection;
