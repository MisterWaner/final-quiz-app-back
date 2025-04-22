import fastify from "fastify";
import fastifyCors from '@fastify/cors';

const fastifyApp = fastify({
    logger: true,
})

fastifyApp.register(fastifyCors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

// routes(fastiyApp);
import { routes } from './routes';


fastifyApp.get('/api', (req, res) => {
    res.send('API démarrée et opérationnelle')
})

fastifyApp.register(routes, { prefix: '/api' });

export default fastifyApp