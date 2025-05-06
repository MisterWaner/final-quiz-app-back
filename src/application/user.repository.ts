import { User } from "../domain/User";

export interface UserRepository {
    createUser(username: string, password: string): Promise<void>;
    getUserById(id: string): Promise<User | null>;
    getUsers(): Promise<User[]>;
    updateUserUsername(id: string, username: string): Promise<void>;
    updateUserPassword(id: string, password: string): Promise<void>;
    deleteUser(id: string): Promise<void>;
}

