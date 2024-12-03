import express from "express";
import cors from "cors";
import testRouter from "./rest/test/TestRouter";
import { ApiPaths } from "./config/paths";
import userRoute from "./rest/user/UserRoute";
import profileRoute from "./rest/profile/ProfileRoute";

const app = express();

app.use(express.json());
app.use(cors());

app.use(ApiPaths.Test, testRouter);
app.use(ApiPaths.Users, userRoute);
app.use(ApiPaths.Profiles, profileRoute);

export default app;
