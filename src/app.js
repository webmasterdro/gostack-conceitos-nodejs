const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { 
    title,
    url,
    techs
   } = request.body;


  const newRepo = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }  

  repositories.push(newRepo);

  return response.json(newRepo);

});

app.put("/repositories/:id", (request, response) => {
    const {
      title,
      url,
      techs
    } = request.body;
    const { id } = request.params;

    let repo = repositories.find(repo => repo.id === id);
    if (! repo) {
      return response.sendStatus(400);
    }

    return response.json({...repo, title, url, techs})
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex(repo => repo.id === id);
  if (repoIndex < 0) {
    return response.sendStatus(400);
  }

  repositories.splice(repoIndex, 1);

  return response.sendStatus(204);
});

app.post("/repositories/:id/like", (request, response) => {
  const { id }  = request.params;

  const repo = repositories.find(repo => repo.id === id)

  if (! repo) {
    return response.sendStatus(400);
  }

  repo.likes += 1;

  return response.json(repo);

});

module.exports = app;
