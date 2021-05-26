require('dotenv').config()
import {createConnection, Connection} from 'typeorm';

let connection: Connection

export const initConnection = async () => {
  connection = await createConnection({
    type: "mysql",
    url: process.env.USERS_SERVICE_DB_URL,
  })
}

const getConnection = () => connection;

export default getConnection;