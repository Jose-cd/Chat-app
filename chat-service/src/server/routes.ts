import express from "express";
import ChatController from "./controllers/Chat";

const routes = express.Router();

routes.get("/message", ChatController.getMsgList);
routes.post("/message", ChatController.postMsg);
routes.delete("/message/:id", ChatController.deleteMsg);
export default routes;
