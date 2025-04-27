import { GeoFlagsQuestionRepository } from '../../../../application/question.repository';
import { MultipleChoiceQuestion } from '../../../../domain/Question';
import { generateNumberId } from '../../../../lib/id-generator';
import {
    shuffleOptionsInMultipleChoiceQuestion,
    getRandomItem,
    generateMultipleChoiceQuestionOptions,
} from '../../../../lib/quiz-helpers';
import {
    fetchEuropeanCountries,
    fetchAfricanCountries,
    fetchAsianCountries,
    fetchAmericanCountries,
    fetchOceanianCountries,
} from '../data';

export class FlagsQuestionService implements GeoFlagsQuestionRepository {
    async generateEuropeanFlagsQuestion(): Promise<MultipleChoiceQuestion> {
        const id = generateNumberId();
        const countriesData = await fetchEuropeanCountries();
        const selectedCountry = getRandomItem(countriesData);
        const imageUrl = selectedCountry.flags.png;
        const questionText = 'A quel pays appartient ce drapeau?';
        const correctAnswer = selectedCountry.name.common;

        const options = generateMultipleChoiceQuestionOptions(
            countriesData.map((country) => country.name.common)
        );
        options.push(correctAnswer);
        shuffleOptionsInMultipleChoiceQuestion(options);

        return new MultipleChoiceQuestion(
            id,
            questionText,
            options.flat() as string[],
            correctAnswer,
            imageUrl
        );
    }
    async generateAfricanFlagsQuestion(): Promise<MultipleChoiceQuestion> {
        const id = generateNumberId();
        const countriesData = await fetchAfricanCountries();
        const selectedCountry = getRandomItem(countriesData);
        const imageUrl = selectedCountry.flags.png;
        const questionText = 'A quel pays appartient ce drapeau?';
        const correctAnswer = selectedCountry.name.common;

        const options = generateMultipleChoiceQuestionOptions(
            countriesData.map((country) => country.name.common)
        );
        options.push(correctAnswer);
        shuffleOptionsInMultipleChoiceQuestion(options);

        return new MultipleChoiceQuestion(
            id,
            questionText,
            options.flat() as string[],
            correctAnswer,
            imageUrl
        );
    }
    async generateAsianFlagsQuestion(): Promise<MultipleChoiceQuestion> {
        const id = generateNumberId();
        const countriesData = await fetchAsianCountries();
        const selectedCountry = getRandomItem(countriesData);
        const imageUrl = selectedCountry.flags.png;
        const questionText = 'A quel pays appartient ce drapeau?';
        const correctAnswer = selectedCountry.name.common;

        const options = generateMultipleChoiceQuestionOptions(
            countriesData.map((country) => country.name.common)
        );

        options.push(correctAnswer);
        shuffleOptionsInMultipleChoiceQuestion(options);

        return new MultipleChoiceQuestion(
            id,
            questionText,
            options.flat() as string[],
            correctAnswer,
            imageUrl
        );
    }
    async generateAmericanFlagsQuestion(): Promise<MultipleChoiceQuestion> {
        const id = generateNumberId();
        const countriesData = await fetchAmericanCountries();
        const selectedCountry = getRandomItem(countriesData);
        const imageUrl = selectedCountry.flags.png;
        const questionText = 'A quel pays appartient ce drapeau?';
        const correctAnswer = selectedCountry.name.common;

        const options = generateMultipleChoiceQuestionOptions(
            countriesData.map((country) => country.name.common)
        );
        options.push(correctAnswer);
        shuffleOptionsInMultipleChoiceQuestion(options);

        return new MultipleChoiceQuestion(
            id,
            questionText,
            options.flat() as string[],
            correctAnswer,
            imageUrl
        );
    }
    async generateOceanianFlagsQuestion(): Promise<MultipleChoiceQuestion> {
        const id = generateNumberId();
        const countriesData = await fetchOceanianCountries();
        const selectedCountry = getRandomItem(countriesData);
        const imageUrl = selectedCountry.flags.png;
        const questionText = 'A quel pays appartient ce drapeau?';
        const correctAnswer = selectedCountry.name.common;

        const options = generateMultipleChoiceQuestionOptions(
            countriesData.map((country) => country.name.common)
        );
        options.push(correctAnswer);
        shuffleOptionsInMultipleChoiceQuestion(options);

        return new MultipleChoiceQuestion(
            id,
            questionText,
            options.flat() as string[],
            correctAnswer,
            imageUrl
        );
    }
    async generateRandomFlagsQuestion(): Promise<MultipleChoiceQuestion> {
        const randomData = [
            this.generateAfricanFlagsQuestion.bind(this),
            this.generateEuropeanFlagsQuestion.bind(this),
            this.generateAsianFlagsQuestion.bind(this),
            this.generateAmericanFlagsQuestion.bind(this),
            this.generateOceanianFlagsQuestion.bind(this),
        ];

        const randomFlags =
            randomData[Math.floor(Math.random() * randomData.length)];
        return randomFlags();
    }
}
