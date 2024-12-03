import { ProfileService } from "../../domain/profile/ProfileService";
import { Request, Response } from "express";
import { errorMessages } from "../../config/errorMessages";
import { ProfileMapper } from "../../domain/profile/ProfileMapper";
import { ProfileWithUser } from "../../domain/profile/ProfileWithUser";
import { UserNotFoundException } from "../../domain/exception/UserNotFoundException";

export class ProfileController {
  private profileService: ProfileService;
  private profileMapper: ProfileMapper;

  constructor(profileService: ProfileService) {
    this.profileService = profileService;
    this.profileMapper = new ProfileMapper();
  }

  getAllProfiles = async (_req: Request, res: Response) => {
    try {
      const allProfiles = await this.profileService.getAllProfiles();
      const allProfilesResponse =
        this.profileMapper.toProfileWithUserResponseArray(allProfiles);

      res.status(200).json(allProfilesResponse);
    } catch (error: unknown) {
      res.status(500).json({ error: errorMessages.SERVER_ERROR });
    }
  };

  addProfile = async (req: Request, res: Response) => {
    try {
      const profileRequest = this.profileMapper.toCreateRequest(req.body);

      const newProfile = await this.profileService.addProfile(profileRequest);
      const newProfileResponse =
        this.profileMapper.toProfileWithUserResponse(newProfile);

      res.status(200).json(newProfileResponse);
    } catch (error: unknown) {
      if (error instanceof UserNotFoundException) {
        res.status(400).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: errorMessages.SERVER_ERROR });
    }
  };
}
