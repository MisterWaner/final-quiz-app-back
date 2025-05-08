import { User } from '../../domain/User';
import { Session } from '../../domain/Session';
import { db } from '../../db/database';
import { AuthRepository } from '../../application/auth.repository';
import { generateStringId } from '../../lib/id-generator';
import { comparePassword, hashPassword } from '../../lib/auth-helpers';

export class AuthService implements AuthRepository {
    async registerUser(username: string, password: string): Promise<void> {
        const id = generateStringId();
        const hashedPassword = await hashPassword(password);

        db.prepare(
            'INSERT INTO users (id, username, password) VALUES (?, ?, ?)'
        ).run(id, username, hashedPassword);
    }
    
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

    async createSession(userId: string): Promise<Session> {
        const id = generateStringId();
        const nowDate = new Date();
        const expiresAtDate = new Date(nowDate.getTime() + 1000 * 60 * 60 * 24); // 24 hours

        const now = nowDate.getTime();
        const expiresAt = expiresAtDate.getTime();

        db.prepare(
            'INSERT INTO sessions (id, user_id, createdAt, expiresAt) VALUES (?, ?, ?, ?)'
        ).run(id, userId, now, expiresAt);

        return new Session(id, userId, nowDate, expiresAtDate);
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
