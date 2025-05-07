import fastifyApp from './app';
import { config } from 'dotenv';
import { init, isDatabaseEmpty } from './db/database';
import { seedDatabase } from './db/seed';

config();

const PORT = Number(process.env.PORT) || 3001;

async function startServer() {
    try {
        await fastifyApp.listen({ port: PORT });
        console.log(`Server listening on ${PORT}`);

        init();

        if (isDatabaseEmpty()) {
            console.log('🌱 Base de données vide, seeding...');
            await seedDatabase();
        }
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

startServer();
