import fastifyApp from "./app";
import { config } from "dotenv";

config();

const PORT = Number(process.env.PORT) || 3001;

fastifyApp.listen( { port: PORT}, function (err, address) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening on ${address}`);
});
