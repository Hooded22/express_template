import {UserService} from "../../domain/user/UserService";
import {Request, Response} from 'express'
import {UserMapper} from "../../domain/user/UserMapper";
import {UserExistsException} from "../../domain/exception/UserAlreadyExistException";
import {errorMessages} from "../../config/errorMessages";

export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    getAllUsers = async (req: Request, res: Response) => {
        try {
            const allUsers = await this.userService.getAllUsers();
            const userMapper = new UserMapper();
            const allUsersResponseArray = allUsers.map(user => userMapper.toResponse(user));

            res.status(200).json(allUsersResponseArray);
        } catch (error) {
            res.status(500).json({ error: errorMessages.SERVER_ERROR });
        }
    }

    addUser = async (req: Request, res: Response) => {
        try {
            const userMapper = new UserMapper();
            const userRequest = userMapper.toCreateRequest(req.body);
            const newUser = await this.userService.addUser(userRequest);
            const userResponse = userMapper.toResponse(newUser);


            res.status(201).json(userResponse);
        } catch (error) {
            if(error instanceof UserExistsException) {
                res.status(400).json({ error: error.message });
                return;
            }

            res.status(500).json({ error: errorMessages.SERVER_ERROR });
        }
    };
}