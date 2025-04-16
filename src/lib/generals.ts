// Mixes the different options of a multiple choice question
export function shuffleOptionsInMultipleChoiceQuestion<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5);
}

// Returns a random integer between min and max (inclusive)
export function getRandomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
