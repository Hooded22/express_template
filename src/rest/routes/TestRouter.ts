import {Router} from "express";
import {TestService} from "../services/TestService";
import {TestController} from "../controllers/TestController";

const testRouter = Router();
const testService = new TestService()
const testController = new TestController(testService);


testRouter.get("/", testController.getWelcomeMessage)

export default testRouter