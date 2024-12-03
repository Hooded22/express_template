import { Router } from "express";
import { TestService } from "../../domain/test/TestService";
import { TestController } from "./TestController";

const testRouter = Router();
const testService = new TestService();
const testController = new TestController(testService);

testRouter.get("/", testController.getWelcomeMessage);

export default testRouter;
