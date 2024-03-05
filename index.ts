import express from "express";
import { UserRouter } from "./src/user/user.route";
import bodyParser from "body-parser";
import "./src/db/dbMongo.module";

const app: express.Application = express();
const port = 3000;

app.use(bodyParser.json({ type: "application/json" }));

app.use("/user", UserRouter);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
