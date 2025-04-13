import { User } from './User';

export class Session {
    constructor(
        public id: string,
        public userId: User['id'],
        public createdAt: Date,
        public expiresAt: Date
    ) {}
}