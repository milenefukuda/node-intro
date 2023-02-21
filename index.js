import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();

app.use(express.json());

// CRUD

let data = [];

app.get("/", (req, res) => {
  return res.status(200).json(data);
});

// o id é o parâmetro da rota & req.params é um objeto, por isso desestruturamos (L 28)
app.get("/:idUser", (req, res) => {
  let { idUser } = req.params;
  let user = data.find((user) => user.id === idUser);
  return res.status(200).json(user);
});

app.post("/create", (req, res) => {
  let entry = { ...req.body, id: uuidv4() };
  data.push(entry);
  return res.status(201).json(entry);
});

// app.put () & app.patch()
// put para edições completas
// patch para edições mais locais

app.put("/:idUser", (req, res) => {
  let indexObject = 0;
  let { idUser } = req.params;
  let user = data.find((user, index) => {
    // esse código só vai rodar quando a condição do return for verdadeira
    indexObject = index;
    return user.id === idUser;
  });

  let updateUser = { ...user, ...req.body };
  data[indexObject] = updateUser;
  console.log(updateUser);
  // retornar uma resposta com status de 200 e um json  com as informações desejadas!

  return res.status(200).json(updateUser);
});

// para o delete > slip

app.delete("/:idUser", (req, res) => {
  let { idUser } = req.params;
  let filtered = data.filter((user) => user.id !== idUser);
  data = filtered;
  return res.status(200).json(data);
});

app.listen(4000, () => {
  console.log("Server up and running on port: 4000");
});
