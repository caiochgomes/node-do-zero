import { fastify } from "fastify";
//import { DatabaseMemory } from "./database-memory.js";
import { DatabasePostgres } from "./database-postgres.js";

const server = fastify();

//const database = new DatabaseMemory();
const database = new DatabasePostgres();

// POST: Cria informações
server.post("/videos", async (request, reply) => {
  const { title, description, duration } = request.body;

  await database.create({
    title,
    description,
    duration,
  });

  return reply.status(201).send(); // 201: metodo foi criado
});

// GET: Busca informações
server.get("/videos", async (request) => {
  const search = request.query.search;
  console.log(search);
  const videos = await database.list(search);
  return videos;
});

// PUT: Atualiza ou alterar informações
server.put("/videos/:id", async (request, reply) => {
  const videoId = request.params.id;
  const { title, description, duration } = request.body;
  await database.update(videoId, {
    title,
    description,
    duration,
  });

  return reply.status(204).send(); // 204: uma reposta que teve sucesso, mas não tem conteúdo para retornar
});

// Delete: Deleta informações
server.delete("/videos/:id", async (request, reply) => {
  const videoId = request.params.id;

  await database.delete(videoId);

  return reply.status(204).send();
});

server.listen({
  host: "0.0.0.0",
  port: process.env.PORT ?? 3333,
});
