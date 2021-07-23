import { IChatController } from "../../typeDefs/IChatController";

const Chat: IChatController = {
  postMsg: (req, res, next) => {
    const { msg } = req.body;

    if (!msg) return next(new Error("Invalid message."));

    return res.json(msg);
  },
};

export default Chat;
