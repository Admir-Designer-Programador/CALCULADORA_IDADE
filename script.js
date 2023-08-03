// Algoritmo:

// 1. Pegar os valores
// 2. Calcular a Idade
//       a. Com base no ano
//       b. Com mês (EXTRA)
//       c. Com dia (EXTRA)

// 3. Gerar a faixa etária

//     Resultado            Faixa
//     0 à 12                Criança
//     13 à 17                Adolescente
//     18 à 65               Adulto
//     Acima de 65         Idoso


// 4. Organizar o objeto pessoa para salvar na lista
// 5. Cadastrar a pessoa na lista
// 6. Função para carregar as pessoas, carrega a lista do localStorage, chamar ao carregar a página
// 7. Renderizar o conteúdo da tabela com as pessoas cadastradas
// 8. Botão para limpar os registros;


function calcular(event) {
    // Previne o recarregar da página
    event.preventDefault()

    console.log("Foi executada a função calcular")

    // Passo 1
    let usuario = receberValores()

    // Passo 2
    let idadeCalculado = calcularIdade(usuario.ano)

    // Passo 3
    let classificacaoIdade = classificarIdade(idadeCalculado)

    console.log(classificacaoIdade)

    // Passo 4
    usuario = organizarDados(usuario, idadeCalculado, classificacaoIdade)

    // Passo 5
    cadastrarUsuario(usuario)
    
    // Esse
    carregarUsuarios()

    // Ou
    // window.location.reload()

}


function receberValores() {
    let nomeRecebido = document.getElementById("nome").value.trim()
    let diaRecebido = document.getElementById("dia").value
    let mesRecebido = document.getElementById("mes").value
    let anoRecebido = document.getElementById("ano").value

    let dadosUsuario =
    {
        nome: nomeRecebido,
        dia: diaRecebido,
        mes: mesRecebido,
        ano: anoRecebido
    }

    console.log(dadosUsuario)

    return dadosUsuario

}

function calcularIdade(ano) {
    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();

    let idade = (anoAtual - ano);

    console.log(idade)

    return idade
}

function classificarIdade(idade) {
    /* 
    Resultado            Faixa
    0 à 12               Criança
    13 à 17              Adolescente
    18 à 65              Adulto
    Acima de 65          Idoso   
    */


    if (idade <= 12) {
        return "Criança"
    }
    else if (idade >= 13 && idade <= 17) {
        return "Adolescente"

    } else if (idade >= 18 && idade <= 65) {
        return "Adulto"
    }
    else {
        return "Idoso"
    }
}



function organizarDados(dadosUsuario, valorIdade, classificacaoIdade) {

    // console.log(idade);

    let dadosUsuarioAtualizado =

    {
        ...dadosUsuario,
        idade: valorIdade,
        situacaoIdade: classificacaoIdade,
    }

    return dadosUsuarioAtualizado;
}


function cadastrarUsuario(dadosUsuario) {
    let listaUsuarios = []

    // Se houver uma lista de usuarios no localStorage, carregar isso para a variavel listaUsuarios

    if (localStorage.getItem("usuariosCadastrados") != null) {
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"))
    }

    // Adiciona o usuario na lista de usuarios
    listaUsuarios.push(dadosUsuario)

    // Salva a listaUsuarios no localStorage
    localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuarios))

}

function carregarUsuarios() {

    let listaCarregada = []

    if (localStorage.getItem("usuariosCadastrados") != null) {
        listaCarregada = JSON.parse(localStorage.getItem("usuariosCadastrados"))
    }

    if (listaCarregada.length == 0) {
        // Se não tiver nenhum usuario cadastrado, mostrar mensagem
        let tabela = document.getElementById("corpo-tabela")

        tabela.innerHTML = `<tr class="linha-mensagem">
            <td colspan="6">Nenhum usuario cadastrado ☹ </td>
        </tr>`

    } else {
        // Montar conteudo da tabela
        montarTabela(listaCarregada)
    }

    console.log(listaCarregada)
}

window.addEventListener("DOMContentLoaded", () => carregarUsuarios())



function montarTabela(listaUsuarios) {

    let tabela = document.getElementById("corpo-tabela")

    let template = ""

    listaUsuarios.forEach(usuario => {
        template += `<tr>
            <td data-cell="nome">${usuario.nome}</td>
            <td data-cell="datadenascimento">${usuario.dia}/${usuario.mes}/${usuario.ano}</td>
            <td data-cell="idade">${usuario.idade}</td>
            <td data-cell="classificação do Idade">${usuario.situacaoIdade}</td>
        </tr>`
    })

    tabela.innerHTML = template;
}

function deletarRegistros() {
    // Remove o item do localStorage
    localStorage.removeItem("usuariosCadastrados")

    // Recarrega a página
    window.location.reload()
}