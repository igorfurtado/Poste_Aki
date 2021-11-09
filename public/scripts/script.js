
document.addEventListener('DOMContentLoaded', () => {
    updatePosts(); //Assim que a página carregar, updatePosts é chamada.
});

function updatePosts() {
    //Aqui será feita a chamada para o backend, onde serão capturados os posts
    //com seus títulos e descrições. A partir daí, cria-se cards e coloca-os nas divs
    //que foram criados para receber os posts.

    //Fazendo chamada para o backend através do fetch():
    fetch("http://localhost:3000/api/all").then(res => {
        return res.json() //retornando a resposta em formato json (se não fizer isso, vem como formato ReadableStream);
    }).then(json => { //res.json() retorna uma outra promise

        //O resultado de res.json() não é um objeto, mas sim um array de strings.
        //Convertendo para objeto: 
        let postElements = '';
        let posts = JSON.parse(json); //transformando em objeto;

        posts.forEach((post) => {
            let postElement = `
            <div id=${post.id} class="card mb-4">
                <div class="card-header" style="display:flex;justify-content:space-between;align-items:center;">
                    <h5 style="margin-bottom:0;" class="card-title">${post.title}</h5>
                    <button onclick="deletePost(this)" id=${post.id} type="button" class="btn btn-sm btn-danger">Apagar</button>
                </div>
                <div class="card-body">
                    <div class="card-text">${post.description}</div>
                </div>
            </div>`

            postElements += postElement;
        });
        document.getElementById('posts').innerHTML = postElements;
    });
};

function newPost() {
    let title = document.getElementById("title").value;
    let description = document.getElementById("desc").value;

    let post = { title: title, description: description };

    const options = {
        method: "POST",
        headers: new Headers({ 'content-type': 'application/json' }), //construtor que passa um objeto contendo o tipo do cabeçalho http
        body: JSON.stringify(post)
    };

    fetch('http://localhost:3000/api/new', options).then(res => {
        console.log(res);
        updatePosts();
        document.getElementById('title').value = "";
        document.getElementById('desc').value = "";
    });
};

function deletePost(event) {

    let idPosts = { id: event.id };
    const options = {
        method: "DELETE",
        headers: new Headers({ 'content-type': 'application/json' }), //construtor que passa um objeto contendo o tipo do cabeçalho http
        body: JSON.stringify(idPosts) //escrevendo a id no body para a função deletePosts capturar o elemento correto.
    };

    fetch('http://localhost:3000/api/delete', options).then(res => {
        updatePosts();
    });
};