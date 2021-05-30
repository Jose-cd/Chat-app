import express from "express";
import { sessionsController } from "./controllers/Sessions";
import { userController } from "./controllers/Users";

const routes = express.Router();

// Sessions routes
routes.get("/sessions/:sessionId", sessionsController.getSession);
routes.post("/sessions/", sessionsController.createSession);
routes.delete("/sessions/:sessionId", sessionsController.deleteSession);

// Posts routes
routes.get("/users/:userId", userController.getUser);
routes.post("/users/", userController.createUser);

export default routes;
