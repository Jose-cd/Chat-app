import { getRepository } from "typeorm";
import { IChatController } from "../../typeDefs/IChatController";
import Chat from "../../db/entities/Chat";
import generateUUID from "../../helpers/generateUUID";

const ChatController: IChatController = {
  postMsg: async (req, res, next) => {
    const { msg, user } = req.body;
    const chatRepository = getRepository(Chat);

    try {
      const instance = chatRepository.create({
        message: msg,
        username: user,
        id: generateUUID(),
      });
      const result = await chatRepository.save(instance);
      return res.json(result);
    } catch (error) {
      console.log(error);
      return next(new Error("Error."));
    }
  },

  getMsgs: async (_, res, next) => {
    const chatRepository = getRepository(Chat);
    try {
      const result = await chatRepository.find();
      return res.json(result);
    } catch (error) {
      return next(new Error("Error retrieving messages"));
    }
  },
};

export default ChatController;
