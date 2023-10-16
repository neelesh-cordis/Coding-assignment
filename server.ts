import express, { Application } from "express";
import Server from "./src/index";
import * as dotenv from "dotenv";

dotenv.config({ path:  process.cwd() + `\\${process.env.NODE_ENV}.env`});
const app: Application = express();
const server: Server = new Server(app);
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

app
  .listen(PORT, "localhost", function () {
    console.log(`Server is running on port ${PORT}.`);
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.log("Error: address already in use");
    } else {
      console.log(err);
    }
  });
export default app;