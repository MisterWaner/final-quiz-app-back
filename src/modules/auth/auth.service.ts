import { User } from '../../domain/User';
import { Session } from '../../domain/Session';
import { db } from '../../db/database';
import { UserSessionRepository } from '../../application/session.repository';
import { generateStringId } from '../../lib/id-generator';
import { comparePassword } from '../../lib/auth-helpers';

export class AuthService implements UserSessionRepository {
    async authenticateUser(
        username: string,
        password: string
    ): Promise<User | null> {
        const user = db
            .prepare('SELECT * FROM users WHERE username = ?')
            .get(username) as User;

        if (!user) throw new Error('User not found');

        const isPasswordCorrect = await comparePassword(
            password,
            user.password
        );
        if (!isPasswordCorrect) throw new Error('Incorrect credentials');

        return user;
    }
    logoutUser(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }

    async createSession(userId: string): Promise<Session> {
        const id = generateStringId();
        const now = new Date();
        const expiresAt = new Date(now.getTime() + 1000 * 60 * 60 * 24); // 24 hours

        db.prepare(
            'INSERT INTO sessions (id, user_id, createdAt, expiresAt) VALUES (?, ?, ?, ?)'
        ).run(id, userId, now, new Date(now.getTime() + 1000 * 60 * 60 * 24));

        return new Session(id, userId, now, expiresAt);
    }

    async getSessionById(id: string): Promise<Session | null> {
        const session = db
            .prepare('SELECT * FROM sessions WHERE id = ?')
            .get(id) as Session;
        if (!session) throw new Error('Session not found');

        const expiresAt = new Date(session.expiresAt);
        if (expiresAt < new Date()) {
            this.deleteSession(id);
            throw new Error('Session expired');
        }

        return session;
    }

    async deleteSession(id: string): Promise<void> {
        const session = this.getSessionById(id);
        if (!session) throw new Error('Session not found');

        db.prepare('DELETE FROM sessions WHERE id = ?').run(id);
    }
}
