import { IUsersController } from "#root/typedefs/index";
import User from "#root/db/entities/User";
import { getRepository } from "typeorm";
import omit from "lodash.omit";
import generateUUID from "#root/helpers/generateUUID";
import hashPassword from "#root/helpers/hashPassword";

export const userController: IUsersController = {
  getUser: async (req, res, next) => {
    const userRepository = getRepository(User);

    try {
      const user = await userRepository.findOne(req.params.userId);

      if (!user) return next(new Error("invalid user ID"));
      return res.json(user);
    } catch (err) {
      return next(err);
    }
  },
  createUser: async (req, res, next) => {
    const userRepository = getRepository(User);
    if (!req.body.username) {
      return next(new Error("Invalid username"));
    }
    if (!req.body.password) {
      return next(new Error("Invalid password"));
    }

    try {
      const newUser: User = {
        id: generateUUID(),
        passwordHash: hashPassword(req.body.password),
        username: req.body.username,
      };

      const user = userRepository.create(newUser);
      const createdUser = await userRepository.save(user);

      return res.json(omit(createdUser, ["passwordHash"]));
    } catch (err) {
      return next(err);
    }
  },
};
