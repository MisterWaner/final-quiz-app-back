import { MathQuestionRepository } from '../../../application/question.repository';
import { Question } from '../../../types/entities';
import { generateNumberId } from '../../../lib/id-generator';

export class MathQuestionService implements MathQuestionRepository {
    generateAddition(): Question {
        const id = generateNumberId();
        const number1 = Math.floor(Math.random() * 100);
        const number2 = Math.floor(Math.random() * 100);
        const question = `Quel est le résultat de ${number1} + ${number2} ?`;
        const correctAnswer = number1 + number2;

        return {
            id,
            question,
            type: 'direct',
            answer: correctAnswer,
        };
    }
    generateSubtraction(): Question {
        const id = generateNumberId();
        const number1 = Math.floor(Math.random() * 100);
        const number2 = Math.floor(Math.random() * 100);
        let question: string;
        let correctAnswer: number;

        if (number1 > number2) {
            question = `Quel est le résultat de ${number1} - ${number2} ?`;
            correctAnswer = number1 - number2;
        } else if (number1 < number2) {
            question = `Quel est le résultat de ${number2} - ${number1} ?`;
            correctAnswer = number2 - number1;
        } else {
            question = `Quel est le résultat de ${number1} - ${number2} ?`;
            correctAnswer = 0;
        }

        return {
            id,
            question,
            type: 'direct',
            answer: correctAnswer,
        };
    }
    generateMultiplication(): Question {
        const id = generateNumberId();
        const number1 = Math.floor(Math.random() * 10);
        const number2 = Math.floor(Math.random() * 10);
        const question = `Quel est le résultat de ${number1} * ${number2} ?`;
        const correctAnswer = number1 * number2;

        return {
            id,
            question,
            type: 'direct',
            answer: correctAnswer,
        };
    }
    generateRandomOperation(): Question {
        const operations = [
            this.generateAddition.bind(this),
            this.generateSubtraction.bind(this),
            this.generateMultiplication.bind(this),
        ];

        const randomOperation = operations[Math.floor(Math.random() * operations.length)];
        return randomOperation();
    }
}