import { mock, MockProxy } from "jest-mock-extended";
import { ProfileService } from "../ProfileService";
import { ProfileRepository } from "../ProfileRepository";
import { UserRepository } from "../../user/UserRepository";
import { ProfileRequest } from "../../../rest/profile/ProfileRequest";
import { UserNotFoundException } from "../../exception/UserNotFoundException";
import { ProfileWithUser } from "../ProfileWithUser";

describe("ProfileService", () => {
    let profileRepositoryMock: MockProxy<ProfileRepository>;
    let userRepositoryMock: MockProxy<UserRepository>;
    let profileService: ProfileService;

    beforeEach(() => {
        profileRepositoryMock = mock<ProfileRepository>();
        userRepositoryMock = mock<UserRepository>();
        profileService = new ProfileService(profileRepositoryMock, userRepositoryMock);
    });

    test("getAllProfiles should return list of profiles", async () => {
        const profilesResponse = [
            {
                id: 1,
                userId: 1,
                bio: "Test bio",
                picture: "profile.jpg",
                user: {
                    id: 1,
                    username: "testUser",
                    email: "test@example.com",
                    password: "password123"
                },
            },
        ] as ProfileWithUser[];

        profileRepositoryMock.findAll.mockResolvedValue(profilesResponse);

        const profiles = await profileService.getAllProfiles();

        expect(profiles).toEqual(profilesResponse);
        expect(profileRepositoryMock.findAll).toHaveBeenCalled();
    });

    test("addProfile should create a new profile", async () => {
        const profileData: ProfileRequest = {
            userId: 1,
            bio: "Test bio",
            picture: "profile.jpg",
        };
        const profileResponse = {
            id: 1,
            userId: profileData.userId,
            bio: profileData.bio,
            picture: profileData.picture,
            user: {
                id: 1,
                username: "testUser",
                email: "test@example.com",
                password: "password123",
            },
        } as ProfileWithUser;

        userRepositoryMock.findById.mockResolvedValue(profileResponse.user); // Mock user existence
        profileRepositoryMock.createProfile.mockResolvedValue(profileResponse);

        const profile = await profileService.addProfile(profileData);

        expect(profile).toEqual(profileResponse);
        expect(userRepositoryMock.findById).toHaveBeenCalledWith(profileData.userId);
        expect(profileRepositoryMock.createProfile).toHaveBeenCalledWith(profileData);
    });

    test("addProfile should throw UserNotFoundException if user does not exist", async () => {
        const profileData: ProfileRequest = {
            userId: 1,
            bio: "Test bio",
            picture: "profile.jpg",
        };

        userRepositoryMock.findById.mockResolvedValue(null); // Mock user not found

        await expect(profileService.addProfile(profileData)).rejects.toThrow(UserNotFoundException);
        expect(userRepositoryMock.findById).toHaveBeenCalledWith(profileData.userId);
        expect(profileRepositoryMock.createProfile).not.toHaveBeenCalled();
    });
});
