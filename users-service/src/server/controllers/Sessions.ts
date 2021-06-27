import generateUUID from "#root/helpers/generateUUID";
import passwordCompareSync from "#root/helpers/passwordCompareSync";
import dayjs from "dayjs";
import accessEnv from "#root/helpers/accessEnv";
import { getRepository } from "typeorm";
import UserSession from "#root/db/entities/UserSessions";
import User from "#root/db/entities/User";
import { ISessionsController } from "#root/typedefs/index";

const USER_SESSIONS_EXPIRY_HOURS = parseInt(
  accessEnv("USER_SESSIONS_EXPIRY_HOURS", "1"),
  10
);

export const sessionsController: ISessionsController = {
  createSession: async (req, res, next) => {
    const userSessionRepository = getRepository(UserSession);
    const userRepository = getRepository(User);
    if (!req.body.password || !req.body.username) {
      return next(new Error("Invalid body!"));
    }

    try {
      const user = await userRepository.findOne(
        { username: req.body.username },
        { select: ["id", "passwordHash"] }
      );

      if (!user) return next(new Error("Invalid username"));

      if (!passwordCompareSync(req.body.password, user.passwordHash)) {
        return next(Error("Invalid password!"));
      }

      const expiresAt = dayjs().add(USER_SESSIONS_EXPIRY_HOURS).toISOString();

      const sessionToken = generateUUID();

      const userSession = {
        expiresAt,
        id: sessionToken,
        userId: user.id,
      };

      // creating session using repository
      const session = userSessionRepository.create(userSession);
      const result = await userSessionRepository.save(session);

      //creating session using queryBuilder
      // await connection
      //   .createQueryBuilder()
      //   .insert()
      //   .into(UserSession)
      //   .values(userSession)
      //   .execute();

      return res.json(result);
    } catch (err) {
      return next(err);
    }
  },

  deleteSession: async (req, res, next) => {
    const userSessionRepository = getRepository(UserSession);
    try {
      const userSession = await userSessionRepository.findOne(
        req.params.sessionId
      );

      if (!userSession) return next(new Error("Invalid session ID"));

      await userSessionRepository.remove(userSession);

      return res.json(true);
    } catch (err) {
      return next(err);
    }
  },

  getSession: async (req, res, next) => {
    const userSessionRepository = getRepository(UserSession);
    try {
      const userSession = await userSessionRepository.findOne(
        req.params.sessionId
      );

      if (!userSession) return next(new Error("Invalid session ID"));

      return res.json(userSession);
    } catch (err) {
      return next(err);
    }
  },
};
