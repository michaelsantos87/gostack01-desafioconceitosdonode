const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO

  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;
  const id = uuid();

  const repository = { 
      id, 
      title, 
      url, 
      techs, 
      likes: 0 };

  repositories.push(repository)

  return response.json(repository);

});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const indiceRepository = repositories.findIndex(repository => repository.id == id);

  if (indiceRepository < 0) {
    return response.status(400).json({"error": "Id Not Found"});
  }

  const repository = { 
    id, 
    title, 
    url, 
    techs, 
    likes: repositories[indiceRepository].likes };

  repositories[indiceRepository] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  
  const indiceRepository = repositories.findIndex(repository => repository.id == id);

  if (indiceRepository < 0) {
    return response.status(400).json({"error": "Id Not Found"});
  }

  repositories.splice(indiceRepository, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;
  const indiceRepository = repositories.findIndex(repository => repository.id == id);

  if (indiceRepository < 0) {
    return response.status(400).json({"error": "Id Not Found"});
  }

  const repository = { 
    id, 
    "title": repositories[indiceRepository].title, 
    "url": repositories[indiceRepository].url, 
    "techs": repositories[indiceRepository].techs, 
    "likes": repositories[indiceRepository].likes + 1 };

  repositories[indiceRepository] = repository;

  return response.json(repository);
 
});

module.exports = app;
