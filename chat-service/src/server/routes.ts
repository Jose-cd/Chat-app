import express from "express";

const routes = express.Router();

routes.get("/", (req, res) => {
  res.status(200).json("hello world!");
});

export default routes;
