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
        const questionText = `Quel est le drapeau de ${selectedCountry.name.common}?`;
        const correctAnswer = selectedCountry.flags.svg;

        const options = generateMultipleChoiceQuestionOptions(
            countriesData.map((country) => country.flags.svg)
        );
        options.push(correctAnswer);
        shuffleOptionsInMultipleChoiceQuestion(options);

        return new MultipleChoiceQuestion(
            id,
            questionText,
            options.flat() as string[],
            correctAnswer
        );
    }
    async generateAfricanFlagsQuestion(): Promise<MultipleChoiceQuestion> {
        const id = generateNumberId();
        const countriesData = await fetchAfricanCountries();
        const selectedCountry = getRandomItem(countriesData);
        const questionText = `Quel est le drapeau de ${selectedCountry.name.common}?`;
        const correctAnswer = selectedCountry.flags.svg;

        const options = generateMultipleChoiceQuestionOptions(
            countriesData.map((country) => country.flags.svg)
        );
        options.push(correctAnswer);
        shuffleOptionsInMultipleChoiceQuestion(options);

        return new MultipleChoiceQuestion(
            id,
            questionText,
            options.flat() as string[],
            correctAnswer
        );
    }
    async generateAsianFlagsQuestion(): Promise<MultipleChoiceQuestion> {
        const id = generateNumberId();
        const countriesData = await fetchAsianCountries();
        const selectedCountry = getRandomItem(countriesData);
        const questionText = `Quel est le drapeau de ${selectedCountry.name.common}?`;
        const correctAnswer = selectedCountry.flags.svg;

        const options = generateMultipleChoiceQuestionOptions(
            countriesData.map((country) => country.flags.svg)
        );
        options.push(correctAnswer);
        shuffleOptionsInMultipleChoiceQuestion(options);

        return new MultipleChoiceQuestion(
            id,
            questionText,
            options.flat() as string[],
            correctAnswer
        );
    }
    async generateAmericanFlagsQuestion(): Promise<MultipleChoiceQuestion> {
        const id = generateNumberId();
        const countriesData = await fetchAmericanCountries();
        const selectedCountry = getRandomItem(countriesData);
        const questionText = `Quel est le drapeau de ${selectedCountry.name.common}?`;
        const correctAnswer = selectedCountry.flags.svg;

        const options = generateMultipleChoiceQuestionOptions(
            countriesData.map((country) => country.flags.svg)
        );
        options.push(correctAnswer);
        shuffleOptionsInMultipleChoiceQuestion(options);

        return new MultipleChoiceQuestion(
            id,
            questionText,
            options.flat() as string[],
            correctAnswer
        );
    }
    async generateOceanianFlagsQuestion(): Promise<MultipleChoiceQuestion> {
        const id = generateNumberId();
        const countriesData = await fetchOceanianCountries();
        const selectedCountry = getRandomItem(countriesData);
        const questionText = `Quel est le drapeau de ${selectedCountry.name.common}?`;
        const correctAnswer = selectedCountry.flags.svg;

        const options = generateMultipleChoiceQuestionOptions(
            countriesData.map((country) => country.flags.svg)
        );
        options.push(correctAnswer);
        shuffleOptionsInMultipleChoiceQuestion(options);

        return new MultipleChoiceQuestion(
            id,
            questionText,
            options.flat() as string[],
            correctAnswer
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
