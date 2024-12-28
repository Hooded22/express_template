import { ProfileMapper } from "../ProfileMapper";
import { UserMapper } from "../../user/UserMapper";
import { ProfileWithUser } from "../ProfileWithUser";
import { Profile } from "@prisma/client";
import { Request } from "express";

jest.mock("../../user/UserMapper");

describe("ProfileMapper", () => {
    let profileMapper: ProfileMapper;
    let userMapperMock: jest.Mocked<UserMapper>;

    beforeEach(() => {
        userMapperMock = new UserMapper() as jest.Mocked<UserMapper>;
        profileMapper = new ProfileMapper();
        (profileMapper as any).userMapper = userMapperMock;
    });

    test("toProfileWithUserResponse should map profile to response with user", () => {
        const profile: ProfileWithUser = {
            id: 1,
            bio: "Test bio",
            picture: "profile.jpg",
            userId: 1,
            user: {
                id: 1,
                username: "testUser",
                email: "test@example.com",
                password: "password123",
            },
        };
        userMapperMock.toResponse.mockReturnValue({
            id: 1,
            username: "testUser",
            email: "test@example.com",
        });

        const response = profileMapper.toProfileWithUserResponse(profile);

        expect(response).toEqual({
            id: profile.id,
            bio: profile.bio,
            picture: profile.picture,
            user: {
                id: 1,
                username: "testUser",
                email: "test@example.com",
            },
        });
        expect(userMapperMock.toResponse).toHaveBeenCalledWith(profile.user);
    });

    test("toResponse should map profile to simple response", () => {
        const profile: Profile = {
            id: 1,
            bio: "Test bio",
            picture: "profile.jpg",
            userId: 1,
        };

        const response = profileMapper.toResponse(profile);

        expect(response).toEqual({
            id: profile.id,
            bio: profile.bio,
            picture: profile.picture,
        });
    });

    test("toProfileWithUserResponseArray should map array of profiles to responses with user", () => {
        const profiles: ProfileWithUser[] = [{
            id: 1,
            bio: "Test bio",
            picture: "profile.jpg",
            userId: 1,
            user: {
                id: 1,
                username: "testUser",
                email: "test@example.com",
                password: "password123",
            },
        }];
        userMapperMock.toResponse.mockReturnValue({
            id: 1,
            username: "testUser",
            email: "test@example.com",
        });

        const responses = profileMapper.toProfileWithUserResponseArray(profiles);

        expect(responses).toEqual([{
            id: 1,
            bio: "Test bio",
            picture: "profile.jpg",
            user: {
                id: 1,
                username: "testUser",
                email: "test@example.com",
            },
        }]);
    });

    test("toResponseArray should map array of profiles to simple responses", () => {
        const profiles: Profile[] = [{
            id: 1,
            bio: "Test bio",
            picture: "profile.jpg",
            userId: 1,
        }];

        const responses = profileMapper.toResponseArray(profiles);

        expect(responses).toEqual([{
            id: 1,
            bio: "Test bio",
            picture: "profile.jpg",
        }]);
    });

    test("toCreateRequest should map request body to ProfileRequest", () => {
        const body: Request["body"] = {
            bio: "Test bio",
            userId: 1,
            picture: "profile.jpg",
        };

        const request = profileMapper.toCreateRequest(body);

        expect(request).toEqual({
            bio: body.bio,
            userId: body.userId,
            picture: body.picture,
        });
    });
});
