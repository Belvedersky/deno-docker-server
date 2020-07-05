import { config, Fastro, parse } from "./deps.ts";
import * as log from "https://deno.land/std/log/mod.ts"; 

const conf = config({ safe: true });
const port = +conf.PORT;

const server = new Fastro();


server.get("/", (req) => req.send({hello:conf.GREETING}));

server.post('/data', (req) => {
    const payload = parse(req.payload as string);
    const headers = new Headers();
    const status = 200;
    headers.set('Content-type', 'application/json');
    headers.delete('x-powered-by');
    req.send({ data: payload }, 200, headers);
});

await server.listen({ port: port }, (err, addr) => {
    if (err) throw new Error("SERVER_ERROR");
    log.info(`Server running on ${port}`);
});
