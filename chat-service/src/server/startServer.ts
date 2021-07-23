import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import accessEnv from "../helpers/accessEnv";
import routes from "./routes";

const PORT = parseInt(accessEnv("PORT", "7100"), 10);

const startServer = async () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(cors());

  app.use(routes);

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    return res.status(500).json({ message: err.message });
  });

  app.listen(PORT, () => {
    console.info(`Chat service is listening on port ${PORT}`);
  });
};

export default startServer;
