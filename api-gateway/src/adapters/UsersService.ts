import got from "got";

const USERS_SERVICE_URI = <string>process.env.USERS_SERVICE_URI;

export default class UsersService {
  static async fetchUserSession({ sessionId }: { sessionId: string }) {
    const body = await got
      .get(`${USERS_SERVICE_URI}/sessions/${sessionId}`)
      .json();

    return body;
  }
}
