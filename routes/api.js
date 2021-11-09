const express = require("express");
const router = express.Router();
const cors = require('cors');
const posts = require("../model/posts");
const options = {
    origin: "http://192.168.1.17:3000"
};

router.use(cors(options));

//Permitindo acesso ao corpo da requisição:
router.use("/", express.json({ extended: true })); //Em substituição ao body-parser (descontinuado).

router.get("/all", (req, res) => {
    res.json(JSON.stringify(posts.getAll())); //getAll serve para pegar o array "posts" do objeto importado.
});

router.post("/new", (req, res) => {
    let title = req.body.title;
    let description = req.body.description;

    posts.newPost(title, description); //newPost dá um push no array "posts" com as informações passadas na requisição (pelo cliente).

    res.send("Post adicionado com sucesso!");
});

router.delete("/delete", function (req, res) {
    let id = req.body.id;
    posts.deletePost(id);

    res.send("Post deletado com sucesso!");
});

module.exports = router;