import { SubjectService } from '../modules/subject/subject.service';
import { ThemeService } from '../modules/theme/theme.service';
import { Subject } from '../domain/Subject';
import { Theme } from '../domain/Theme';
import { askForConfirmation } from '../lib/ask-for-confirmation';

const subjectService = new SubjectService();
const themeService = new ThemeService();

const subjectsWithThemes: Record<string, string[]> = {
    Mathématiques: [
        'Addition',
        'Multiplication',
        'Soustraction',
        'Calculs aléatoires',
    ],
    Géographie: [
        'Capitales européennes',
        'Capitales américaines',
        'Capitales asiatiques',
        'Capitales océaniques',
        'Capitales africaines',
        'Capitales aléatoires',
        'Drapeaux européens',
        'Drapeaux américains',
        'Drapeaux asiatiques',
        'Drapeaux océaniques',
        'Drapeaux africains',
        'Drapeaux aléatoires',
    ],
};

async function seed() {
    const confirm = await askForConfirmation(
        '⚠️  Ceci va supprimer tous les sujets et thèmes. Continuer ? (y/N) '
    );

    if (!confirm) {
        console.log('❌ Opération annulée.');
        process.exit(0);
    }

    await themeService.reset();
    await subjectService.reset();

    for (const [subjectName, themes] of Object.entries(subjectsWithThemes)) {
        try {
            const subject: Subject = {
                id: 0,
                name: subjectName,
                subjectPath: '',
                themes: [],
            };

            await subjectService.createSubject(subject);

            const createdSubject = (await subjectService.getSubjects()).find(
                (s) => s.name === subjectName
            );
            if (!createdSubject) {
                console.error(`No subject found for ${subjectName}`);
                continue;
            }

            for (const themeName of themes) {
                const theme: Theme = {
                    id: 0,
                    name: themeName,
                    themePath: '',
                    subjectId: createdSubject.id,
                };

                await themeService.createTheme(theme);
            }

            console.log(`Seeding done for ${subjectName}`);
        } catch (error) {
            console.error(`Error while seeding ${subjectName}`, error);
        }
    }

    console.log('🌱 Base de données remplie avec succès.');
}

seed();
