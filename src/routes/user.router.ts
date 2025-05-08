import { FastifyInstance } from 'fastify';
import { UserController } from '../modules/user/user.controller';
import { UserService } from '../modules/user/user.service';
import { User } from '../domain/User';

const userService = new UserService();
const userController = new UserController(userService);

export async function userRouter(fastify: FastifyInstance) {
    fastify.get<{ Reply: User[] }>('/', {}, userController.getUsers);
    fastify.get<{ Params: { id: string }; Reply: User }>(
        '/:id',
        {},
        userController.getUserById
    );
    fastify.put<{ Params: { id: string }; Body: { name: User['username'] } }>(
        '/:id/username',
        userController.updateUserUsername
    );
    fastify.put<{ Params: { id: string }; Body: { name: User['password'] } }>(
        '/:id/password',
        userController.updateUserPassword
    );
    fastify.delete<{ Params: { id: string } }>(
        '/:id',
        userController.deleteUser
    );
}
