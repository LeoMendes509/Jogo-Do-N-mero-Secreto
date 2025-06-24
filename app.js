// Variáveis globais do jogo
let listaDeNumerosSorteados = [];
let numeroLimite = 50;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

/**
 * Exibe texto na tela e reproduz com voz
 * @param {string} tag - Seletor CSS do elemento
 * @param {string} texto - Texto a ser exibido
 */
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    // Voz mais natural e compreensível
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { 
        rate: 0.9, 
        pitch: 1 
    });
}

/**
 * Exibe a mensagem inicial do jogo
 */
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 50 :');
}

/**
 * Verifica se o chute do jogador está correto
 */
function verificarChute() {
    let chute = document.querySelector('input').value;
    let input = document.querySelector('input');

    if (chute == numeroSecreto) {
        // Jogador acertou!
        exibirTextoNaTela('h1', 'Acertou !');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa} !`;
        exibirTextoNaTela('p', mensagemTentativas);
        
        // Habilita botão de reiniciar com animação
        let botaoReiniciar = document.getElementById('reiniciar');
        botaoReiniciar.removeAttribute('disabled');
        botaoReiniciar.classList.add('botao-habilitado');
        
        // Adiciona efeito de destaque no título
        document.querySelector('h1').classList.add('acerto-destaque');
        
    } else {
        // Jogador errou
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor.');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior.');
        }
        
        // Animação de shake no input
        input.classList.add('shake');
        setTimeout(() => {
            input.classList.remove('shake');
        }, 500);
        
        tentativas++;
        limparCampo();
    }
}

/**
 * Gera um número aleatório único
 * @returns {number} Número aleatório entre 1 e o limite
 */
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementos = listaDeNumerosSorteados.length;

    // Reseta a lista se todos os números foram usados
    if (quantidadeDeElementos == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    // Verifica se o número já foi sorteado
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log('Números já sorteados:', listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

/**
 * Limpa o campo de input
 */
function limparCampo() {
    let chute = document.querySelector('input');
    chute.value = '';
    chute.focus(); // Mantém o foco no input para melhor UX
}

/**
 * Reinicia o jogo com novas configurações
 */
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    
    // Remove classes de animação
    document.querySelector('h1').classList.remove('acerto-destaque');
    let botaoReiniciar = document.getElementById('reiniciar');
    botaoReiniciar.classList.remove('botao-habilitado');
    
    exibirMensagemInicial();
    botaoReiniciar.setAttribute('disabled', true);
}

// Inicializa o jogo
exibirMensagemInicial();