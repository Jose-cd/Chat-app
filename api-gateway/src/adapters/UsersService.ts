import { User } from "#root/graphql/entitites/User";
import { UserSession } from "#root/graphql/entitites/UserSession";
import got from "got";

const USERS_SERVICE_URI = <string>process.env.USERS_SERVICE_URI;

export default class UsersService {
  static async fetchUserSession({
    sessionId,
  }: {
    sessionId: string;
  }): Promise<UserSession> {
    const body: UserSession = await got
      .get(`${USERS_SERVICE_URI}/sessions/${sessionId}`)
      .json();

    return body;
  }

  static async fetchUserInfo(userId: string): Promise<User> {
    const body: User = await got
      .get(`${USERS_SERVICE_URI}/users/${userId}`)
      .json();

    return body;
  }
}
