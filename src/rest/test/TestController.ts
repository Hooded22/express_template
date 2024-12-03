import { TestService } from "../../domain/test/TestService";
import { Response, Request } from "express";

export class TestController {
  private testService: TestService;

  constructor(testService: TestService) {
    console.log("testService: ", testService);

    this.testService = testService;
  }

  public getWelcomeMessage = (req: Request, res: Response) => {
    const message = this.testService.getWelcomeMessage();

    res.status(200).json({
      message,
    });
  };
}
