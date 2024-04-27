let produtos = {};

document.addEventListener('DOMContentLoaded', function () {
    exibirProdutos();

    document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault();

        const nome = document.querySelector('#nome').value;
        const valor = document.querySelector('#valor').value;
        const imagem = document.querySelector('#imagem').value;

        if (nome && valor && imagem) {
            adicionarProduto(nome, parseFloat(valor), imagem);
        } else {
            alert('Por favor, preencha todos os campos do formulário.');
        }
    });

});

function exibirProdutos() {
    fetch('https://challenger-produtos-servidor-web-1.onrender.com/produtos')
        .then(response => response.json())
        .then(produtosData => {
            const container = document.querySelector('.produtos');
            container.innerHTML = '';

            let produtosCounter = 0;
            let secaoAtual;

            produtosData.forEach((produto, index) => {
                if (index % 3 === 0 || produtosCounter === 0) {
                    secaoAtual = document.createElement('div');
                    secaoAtual.classList.add('secao');
                    container.appendChild(secaoAtual);
                }

                const card = criarCardProduto(produto);
                secaoAtual.appendChild(card);

                produtosCounter++;
            });
        })
        .catch(error => console.error('Erro ao buscar os dados dos produtos:', error));

    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('icone__lixeira')) {
            const card = event.target.closest('.card');
            const produtoId = card.dataset.produtoId;

            if (confirm(`Tem certeza que deseja excluir o produto "${produtos[produtoId].nome}"?`)) {
                removerProduto(produtoId);
            }
        }
    });
}


function adicionarProduto(nome, valor, imagem) {
    fetch('https://challenger-produtos-servidor-web-1.onrender.com/produtos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            preco: valor,
            imagem: imagem
        })
    })
    .then(response => {
        if (response.ok) {
            limparFormulario();
            alert('Produto adicionado com sucesso!');
            exibirProdutos();
        } else {
            alert('Erro ao adicionar produto. Por favor, tente novamente.');
        }
    })
    .catch(error => {
        console.error('Erro ao adicionar produto:', error);
        alert('Erro ao adicionar produto. Por favor, tente novamente.');
    });
}

function limparFormulario() {
    document.querySelector('form').reset();
}

function removerProduto(produtoId) {
    fetch(`https://challenger-produtos-servidor-web-1.onrender.com/produtos/${produtoId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            alert('Produto removido com sucesso!');
            exibirProdutos(); // Atualiza a lista de produtos após remover um produto
        } else {
            alert('Erro ao remover produto. Por favor, tente novamente.');
        }
    })
    .catch(error => {
        console.error('Erro ao remover produto:', error);
        alert('Erro ao remover produto. Por favor, tente novamente.');
    });
}

function criarCardProduto(produto) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.produtoId = produto.id;

    const imagem = document.createElement('img');
    imagem.classList.add('produto');
    imagem.src = produto.imagem;
    imagem.alt = produto.nome;

    const nomeProduto = document.createElement('p');
    nomeProduto.classList.add('nome__produto');
    nomeProduto.textContent = produto.nome;

    const precoProduto = document.createElement('p');
    precoProduto.classList.add('preco__produto');
    precoProduto.textContent = `$ ${produto.preco.toFixed(2)}`;

    const iconeLixeira = document.createElement('img');
    iconeLixeira.src = 'imgs/icon_trash.png';
    iconeLixeira.alt = 'Ícone de Lixeira';
    iconeLixeira.classList.add('icone__lixeira');

    precoProduto.appendChild(iconeLixeira);

    card.appendChild(imagem);
    card.appendChild(nomeProduto);
    card.appendChild(precoProduto);

    return card;
}
