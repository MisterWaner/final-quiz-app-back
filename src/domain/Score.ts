import { User } from "./User";
import { Subject } from "./Subject";
import { Theme } from "./Theme";

export class Score {
    constructor(
        public id: number,
        public userId: User['id'],
        public subject: Subject['name'],
        public theme: Theme['name'],
        public value: number,
        public date: Date
    ) {}
}