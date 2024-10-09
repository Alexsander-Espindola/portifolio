document.addEventListener("DOMContentLoaded", () => {
    // Seleciona todos os links de navegação
    const links = document.querySelectorAll('nav ul li a');
    console.log(links);
    
    // Seleciona o elemento 'main' onde o conteúdo será carregado
    const conteudo = document.getElementById('navbar');
    console.log(conteudo);
    const mainContent = document.querySelector('main');

    // Função para carregar conteúdo dinâmico com fetch()
    function carregarConteudo(secao) {
        // Utiliza fetch para buscar o arquivo HTML correspondente à seção
        console.log(secao);
        fetch(`paginas/${secao}.html`)
            .then(response => {
                // Verifica se a requisição foi bem-sucedida
                if (!response.ok) {
                    throw new Error(`Erro ao carregar a seção: ${secao}`);
                }
                return response.text(); // Converte a resposta em texto (HTML)
            })
            .then(data => {
                // Insere o conteúdo HTML carregado no elemento main
                mainContent.innerHTML = data;
            })
            .catch(error => {
                // Em caso de erro, mostra uma mensagem de erro no main
                conteudo.innerHTML = `<p>Erro: Não foi possível carregar o conteúdo.</p>`;
                console.error('Erro:', error);
            });
    }

    // Adiciona um evento de clique a cada link de navegação
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // Evita o comportamento padrão (recarregar a página)
            const secao = this.getAttribute('data-section'); // Pega o valor de data-section
            carregarConteudo(secao); // Chama a função para carregar a seção
        });
    });

    // Carrega o conteúdo inicial (Home) ao carregar a página
    carregarConteudo('home');
});
