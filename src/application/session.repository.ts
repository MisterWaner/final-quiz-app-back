import { Session } from "../domain/Session";
import { User } from "../domain/User";

export interface UserSessionRepository {
    createSession(userId: string): Promise<Session>;
    getSessionById(id: string): Promise<Session | null>;
    deleteSession(id: string): Promise<void>;
    authenticateUser(username: string, password: string): Promise<User | null>;
}