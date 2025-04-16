import { GeoQuestionRepository } from '../../../../application/question.repository';
import { MultipleChoiceQuestion } from '../../../../domain/Question';
import { generateNumberId } from '../../../../lib/id-generator';
import {
    shuffleOptionsInMultipleChoiceQuestion,
    getRandomInteger,
} from '../../../../lib/generals';
import { Country, fetchEuropeanCountries } from '../data';

export class CapitalsQuestionService implements GeoQuestionRepository {
    getRandomCountry(array: Country[]): Country {
        const randomIndex = getRandomInteger(0, array.length - 1);
        const selectedCountry = array[randomIndex];
        return selectedCountry;
    }

    async generateEuropeanCapitalsQuestion(): Promise<MultipleChoiceQuestion> {
        const id = generateNumberId();
        const countriesData = await fetchEuropeanCountries();
        const selectedCountry = this.getRandomCountry(countriesData);
        const questionText = `Quelle est la capitale de ${selectedCountry.name.common}?`;
        const correctAnswer = selectedCountry.capital;

        // Generate 3 wrong answers
        const wrongAnswers = new Set<string | string[]>();
        while (wrongAnswers.size < 3) {
            const randomIndex = getRandomInteger(0, countriesData.length - 1);
            const randomCapital = countriesData[randomIndex].capital;
            if (randomCapital !== correctAnswer) {
                wrongAnswers.add(randomCapital);
            }
        }

        // Mixes the correct answer and the wrong answers
        const options = Array.from(wrongAnswers)
        options.push(correctAnswer);
        shuffleOptionsInMultipleChoiceQuestion(options);

        return new MultipleChoiceQuestion(
            id,
            questionText,
            options as string[],
            correctAnswer 
        );
        
    }
    generateAfricanCapitalsQuestion(): Promise<MultipleChoiceQuestion> {
        throw new Error('Method not implemented.');
    }
    generateAsianCapitalsQuestion(): Promise<MultipleChoiceQuestion> {
        throw new Error('Method not implemented.');
    }
    generateAmericanCapitalsQuestion(): Promise<MultipleChoiceQuestion> {
        throw new Error('Method not implemented.');
    }
    generateOceanicCapitalsQuestion(): Promise<MultipleChoiceQuestion> {
        throw new Error('Method not implemented.');
    }
    generateRandomCapitalsQuestion(): Promise<MultipleChoiceQuestion> {
        throw new Error('Method not implemented.');
    }
}
