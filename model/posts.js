module.exports = {

    posts: [
        {
            id: "qualquer coisa",
            title: "Teste do poste aki",
            description: "Descrição teste"
        }
    ],

    getAll() {
        return this.posts;
    },

    newPost(title, description) {
        this.posts.push({ "id": generateID(), "title": title, "description": description });
    },

    deletePost(id) {
        this.posts.forEach(element => {
            let idArray = element.id;
            var indexDelete = idArray.indexOf();

            if (idArray == id) {
                this.posts.splice(indexDelete, 1);
            }
        });
    }
};

function generateID() {
    return Math.random().toString(36).slice(2, 9); //base 36 na criação do id aleatório (inclusão de todas as letras + 9 números).
};