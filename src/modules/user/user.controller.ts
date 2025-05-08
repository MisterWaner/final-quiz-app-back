import { FastifyRequest, FastifyReply } from 'fastify';
import { UserService } from './user.service';
import { User } from '../../domain/User';

export class UserController {
    constructor(private userService: UserService) {}

    getUsers = async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const users = await this.userService.getUsers();
            if (!users) reply.status(404).send('No users found');

            if (users.length === 0)
                reply.status(404).send('Users not provided');

            reply.status(200).send(users);
        } catch (error) {
            reply.status(500).send(error);
        }
    };

    getUserById = async (
        request: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) => {
        try {
            const { id } = request.params;
            const user = await this.userService.getUserById(id);

            if (!user) {
                reply.status(404).send('No user found');
                return;
            }
            reply.status(200).send(user);
        } catch (error) {
            reply.status(500).send(error);
        }
    };

    updateUserUsername = async (
        request: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) => {
        try {
            const { id } = request.params;

            const user = await this.userService.getUserById(id);

            if (!user) {
                reply.status(404).send('No user found');
                return;
            }

            const { username } = request.body as User;
            const users = await this.userService.getUsers();
            const userExists = users.find((user) => user.username === username);
            if (userExists) reply.status(409).send('Username already taken');

            await this.userService.updateUserUsername(id, username);
            reply.status(200).send('User updated');
        } catch (error) {
            reply.status(500).send(error);
        }
    };

    updateUserPassword = async (
        request: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) => {
        try {
            const { id } = request.params;

            const user = await this.userService.getUserById(id);

            if (!user) {
                reply.status(404).send('No user found');
                return;
            }

            const { password } = request.body as User;

            if (!password) {
                reply.status(400).send('Password is required');
                return;
            }

            await this.userService.updateUserPassword(id, password);
            reply.status(200).send('User updated');
        } catch (error) {
            reply.status(500).send(error);
        }
    };

    deleteUser = async (
        request: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) => {
        try {
            const { id } = request.params;
            const user = await this.userService.getUserById(id);
            if (!user) {
                reply.status(404).send('No user found');
                return;
            }

            await this.userService.deleteUser(id);
            reply.status(200).send('User deleted');
        } catch (error) {
            reply.status(500).send(error);
        }
    };
}
