export type User = {
    id: string;
    username: string;
    password: string;
    confimPassword: string;
}

export type Session = {
    id: string;
    userId: string;
    createdAt: Date;
    expiresAt: Date;
}

export type Score = {
    id: number;
    userId: string;
    subject: Subject['name'];
    theme: Theme['name'];
    value: number;
    createdAt: Date;
}

export type Quiz = {
    id: number;
    subject: Subject['name'];
    theme: Theme['name'];
    questions: Question[];
}

export type Subject = {
    id: number;
    name: string;
    subjectPath: string;
    themes: Theme[];
}

export type Theme = {
    id: number;
    name: string;
    themePath: string;
    subjectId: number;
}

export type QuestionType = "direct" | "multiple-choice" | "true-false";

export type Question = {
    id: number;
    type: QuestionType;
    question: string;
    options?: string[];
    answer: string | number | boolean;
}