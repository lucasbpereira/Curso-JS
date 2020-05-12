// Exercício 1
var idade = 19;

function checaIdade(idade) {
    // Retornar uma
    return new Promise(function(resolve, error) {
        setTimeout(function() {
            if(idade >= 18){
                resolve()
            } else {
                error()
            }
        }, 2000)
    })
    
};

checaIdade(idade)
.then(function() {
    console.log("Maior que 18");
})
.catch(function() {
    console.log("Menor que 18");
});

//Exercício 2

var inputElement = document.querySelector('input[name=user]');
var btnElement = document.querySelector('.search');
var listElement = document.querySelector('ul');

function renderInfos(Infos) {
   listElement.innerHTML = "";
    for (info of Infos) {
        var infoText = document.createTextNode(info.name);
        var liElement = document.createElement('li');

        liElement.appendChild(infoText);
        listElement.appendChild(liElement);
    }
}

btnElement.onclick = function addUser() {
    var user = inputElement.value;

    if (!user) return;
    loading();

    axios.get('https://api.github.com/users/' + user + '/repos')
    .then(function(response) {
        renderInfos(response.data)
    })
    .catch(function(error) {
        alert('error 404');
        notFound();
    });
    inputElement.value = "";
};

function loading() {
    listElement.innerHTML = "";
    var textLoading = document.createTextNode('Carregando...');
    var loadingLi = document.createElement('li');

    loadingLi.appendChild(textLoading);
    listElement.appendChild(loadingLi);
}

function notFound() {
    listElement.innerHTML = "";
    var textLoading = document.createTextNode('Desculpe, não encontramos o usuário desejado, tente novamente...');
    var errorLi = document.createElement('li');

    errorLi.appendChild(textLoading);
    listElement.appendChild(errorLi);
}