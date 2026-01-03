import express from "express";
import { apiRoutes } from "./modules/routes.js";

const app = express();

function registerRoutes(app: express.Express) {
  app.use("/api", apiRoutes());
}

registerRoutes(app);

export default app;