import express from 'express';
import cors from 'cors'
import testRouter from "./rest/test/TestRouter";
import {ApiPaths} from "./config/paths";
import userRoute from "./rest/user/UserRoute";

const app = express();

app.use(express.json())
app.use(cors())

app.use(ApiPaths.Test, testRouter)
app.use(ApiPaths.Users, userRoute)

export default app;