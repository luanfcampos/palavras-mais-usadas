const fs = require('fs')
const path = require('path')


//retorna os caminhos até cada um dos arquivos
function lerDiretorio(caminho) {
    return new Promise((resolve, reject) => {
        try { 
            const arquivos = fs.readdirSync(caminho)
            const arquivosCompletos = arquivos.map(arquivo => {
                return path.join(caminho, arquivo)
            })
            resolve(arquivosCompletos)
        } catch (e) {
            reject(e)
        }
    })
}

//passa o conteudo de um arquivo para string
function lerArquivo(caminho) {
    return new Promise((resolve, reject) => {
        try {
            const conteudo = fs.readFileSync(caminho, {encoding: 'utf-8'})
            resolve(conteudo.toString())
        } catch(e){
            reject(e)
        }

    })
}

//irá retornar um array com os conteudos de cada arquivo
function lerArquivos(caminhos) {
    return Promise.all(caminhos.map(caminho => lerArquivo(caminho)))
}

//une os conteudos do array em uma unica string
function mesclarConteudos (array) {
    return array.join(' ')
}

//separa os conteudos
function separarPor(simbolo) {
    return function(texto) {
        return texto.split(simbolo)
    }
}
 
//filtra os arquivos com a extenção de interesse
function elementosTerminadosCom(padrao) {
    return function(array) {
        return array.filter(el => el.endsWith(padrao))
    }
}

//remove linhas vazias
function removerElementoSeVazio(array) {
    return array.filter(el => el.trim())
}

//remove linhas com intervalo de tempo
function removerElementoSeIncluir(padraoTextual){
    return function(array){
        return array.filter(el => !el.includes(padraoTextual))
    }
}

//remove linhas com apenas numeros 
function removerElementoSeApenasNumero(array) {
    return array.filter(el => {
        const num = parseInt(el.trim())
        return num !== num
    })
}

//remove simbolos, caracteres especiais e tags das linhas
function removerSimbolos(simbolos) {
    return function (array) {
        return array.map(el => {
            return simbolos.reduce((acc, simbolo) => {
                return acc.split(simbolo).join('')
            }, el)
        })
    }
}

//agrupa e conta as palavras
function agruparElementos(palavras) {
    return Object.values(palavras.reduce((acc, palavra)=> {
        const el = palavra.toLowerCase()
        const qtde = acc[el] ? acc[el].qtde + 1 : 1
        acc[el] = { elemento: el, qtde }
        return acc
    }, {}))
}

//ordena as palavras
function ordenarPorAtribNumerico(attr, ordem = 'asc') {
    return function (array) {
        const asc = (o1, o2) => o1[attr] - o2[attr]
        const desc = (o1, o2) => o2[attr] - o1[attr]
        return array.sort(ordem === 'asc' ? asc : desc)
    }
}

module.exports = {
    lerDiretorio,
    lerArquivo,
    lerArquivos,
    mesclarConteudos,
    separarPor,
    elementosTerminadosCom,
    removerElementoSeVazio,
    removerElementoSeIncluir,
    removerElementoSeApenasNumero,
    removerSimbolos,
    agruparElementos,
    ordenarPorAtribNumerico,
}