import fastify from "fastify";

const fastifyApp = fastify({
    logger: true,
})

// routes(fastiyApp);
import { routes } from './routes';


fastifyApp.get('/api', (req, res) => {
    res.send('API démarrée et opérationnelle')
})

fastifyApp.register(routes, { prefix: '/api' });

export default fastifyApp