import express from 'express';
import cors from 'cors'
import testRouter from "./rest/routes/TestRouter";
import {ApiPaths} from "./config/paths";

const app = express();

app.use(express.json())
app.use(cors())

app.use(ApiPaths.Test, testRouter)

export default app;