import express from "express";
import ChatController from "./controllers/Chat";

const routes = express.Router();

routes.get("/message", ChatController.getMsgs);
routes.post("/message", ChatController.postMsg);

export default routes;
