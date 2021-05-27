import User from "#root/db/entities/User";
import UserSession from "#root/db/entities/UserSessions";
import accessEnv from "#root/helpers/accessEnv";
import generateUUID from "#root/helpers/generateUUID";
import passwordCompareSync from "#root/helpers/passwordCompareSync";
import dayjs from "dayjs";
import { Express } from "express";
import { getRepository, getConnection } from "typeorm";

const USER_SESSIONS_EXPIRY_HOURS = parseInt(
  accessEnv("USER_SESSIONS_EXPIRY_HOURS", "1"),
  10
);

const setupRoutes = (app: Express) => {
  const connection = getConnection();
  const userRepository = getRepository(User);

  app.post("/sessions", async (req, res, next) => {
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

      await connection
        .createQueryBuilder()
        .insert()
        .into(UserSession)
        .values(userSession);

      res.json(userSession);
    } catch (err) {
      return next(err);
    }
  });

  app.get("/users/:userId", async (req, res, next) => {
    try {
      const user = await userRepository.findOne(req.params.userId);

      if (!user) return next(new Error("invalid user ID"));
      return res.json(user);
    } catch (err) {
      return next(err);
    }
  });
};

export default setupRoutes;
