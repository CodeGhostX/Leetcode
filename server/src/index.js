import serverConfig from "./config/serverConfig.js";
import express from "express";
const app = express();

app.get('/', (_, res)=>{
  res.json({message: "server is running"})
})

app.listen(serverConfig.PORT, ()=>{
  console.log(`Server is runnig on port ${serverConfig.PORT}`)
})