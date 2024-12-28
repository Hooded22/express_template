import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import { PrismaClient, Profile } from "@prisma/client";
import { ProfileRepository } from "../ProfileRepository";
import { ProfileWithUser } from "../ProfileWithUser";
import {ProfileRequest} from "../../../rest/profile/ProfileRequest";

jest.mock("@prisma/client", () => ({
    PrismaClient: jest.fn().mockImplementation(() => ({
        profile: {
            findMany: jest.fn(),
            findUnique: jest.fn(),
            create: jest.fn(),
            delete: jest.fn(),
            update: jest.fn(),
        },
    })),
}));

describe("ProfileRepository", () => {
    let prismaMock: DeepMockProxy<PrismaClient>;
    let profileRepository: ProfileRepository;

    beforeEach(() => {
        prismaMock = mockDeep<PrismaClient>();
        profileRepository = new ProfileRepository(prismaMock);
    });

    test("createProfile should call prisma.create with correct data", async () => {
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

        prismaMock.profile.create.mockResolvedValue(profileResponse);

        const profile = await profileRepository.createProfile(profileData);

        expect(profile).toEqual(profileResponse);
        expect(prismaMock.profile.create).toHaveBeenCalledWith({
            data: {
                userId: profileData.userId,
                bio: profileData.bio,
                picture: profileData.picture,
            },
            include: { user: true },
        });
    });

    test("findAll should return profiles list", async () => {
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
                    password: "password123",
                },
            },
        ] as ProfileWithUser[];

        prismaMock.profile.findMany.mockResolvedValue(profilesResponse);

        const profiles = await profileRepository.findAll();

        expect(profiles).toEqual(profilesResponse);
        expect(prismaMock.profile.findMany).toHaveBeenCalledWith({
            include: { user: true },
        });
    });

    test("findById should find profile by id", async () => {
        const profileResponse = {
            id: 1,
            userId: 1,
            bio: "Test bio",
            picture: "profile.jpg",
            user: {
                id: 1,
                username: "testUser",
                email: "test@example.com",
                password: "password123",
            },
        } as ProfileWithUser;

        prismaMock.profile.findUnique.mockResolvedValue(profileResponse);

        const profile = await profileRepository.findById(1);

        expect(profile).toEqual(profileResponse);
        expect(prismaMock.profile.findUnique).toHaveBeenCalledWith({
            where: { id: 1 },
            include: { user: true },
        });
    });

    test("deleteProfile should delete profile by id", async () => {
        const profileResponse = {
            id: 1,
            userId: 1,
            bio: "Test bio",
            picture: "profile.jpg",
        } as Profile;

        prismaMock.profile.delete.mockResolvedValue(profileResponse);

        const deletedProfile = await profileRepository.deleteProfile(1);

        expect(deletedProfile).toEqual(profileResponse);
        expect(prismaMock.profile.delete).toHaveBeenCalledWith({
            where: { id: 1 },
        });
    });

    test("updateProfile should update profile by id", async () => {
        const profileData: ProfileRequest = {
            userId: 1,
            bio: "Updated bio",
            picture: "updated_profile.jpg",
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

        prismaMock.profile.update.mockResolvedValue(profileResponse);

        const updatedProfile = await profileRepository.updateProfile(1, profileData);

        expect(updatedProfile).toEqual(profileResponse);
        expect(prismaMock.profile.update).toHaveBeenCalledWith({
            where: { id: 1 },
            data: {
                userId: profileData.userId,
                bio: profileData.bio,
                picture: profileData.picture,
            },
            include: { user: true },
        });
    });
});
