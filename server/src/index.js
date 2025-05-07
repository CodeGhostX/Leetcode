import { WinstonLogger as logger, ServerConfig } from "./config/index.js";
import express from "express";
import cors from 'cors';
import router from "./routes/index.js";
import { login, signup } from "./controllers/index.js";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", router);


app.listen(ServerConfig.PORT, () => {
  logger.info(`Server is runnig on port ${ServerConfig.PORT}`);
});
