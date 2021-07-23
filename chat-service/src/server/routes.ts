import express from "express";
import ChatController from "./controllers/Chat";

const routes = express.Router();

routes.post("/message", ChatController.postMsg);

export default routes;
