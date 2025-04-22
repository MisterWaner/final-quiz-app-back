import { Subject } from '../domain/Subject';

export interface SubjectRepository {
    createSubject(subject: Subject): Promise<void>;
    getSubjects(): Promise<Subject[]>;
    getSubjectById(id: number): Promise<Subject>;
    updateSubject(id: number, name: Subject['name']): Promise<void>;
    deleteSubject(id: number): Promise<void>;
}