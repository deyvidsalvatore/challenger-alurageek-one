document.addEventListener('DOMContentLoaded', function () {
    fetch('https://challenger-produtos-servidor-web-1.onrender.com/produtos')
        .then(response => response.json())
        .then(produtos => {
            const container = document.querySelector('.produtos');

            let secaoAtual;
            produtos.forEach((produto, index) => {
                if (index % 3 === 0) {
                    secaoAtual = document.createElement('div');
                    secaoAtual.classList.add('secao');
                    container.appendChild(secaoAtual);
                }

                const card = document.createElement('div');
                card.classList.add('card');

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

                secaoAtual.appendChild(card);
            });
        })
        .catch(error => console.error('Erro ao buscar os dados dos produtos:', error));
});
