import { WinstonLogger as logger, ServerConfig } from "./config/index.js";
import express from "express";
import { infoRoutes } from "./routes/index.js";
const app = express();

app.use("/api", infoRoutes);

app.listen(ServerConfig.PORT, () => {
  logger.info(`Server is runnig on port ${ServerConfig.PORT}`);
});
