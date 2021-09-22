const path = require('path')
const fn = require('./funcoes')

const caminho = path.join(__dirname, '..', 'dados', 'legendas')

const simbolos = [
    '.', '?', '-', ',', '"', '_', '<i>', '</i>', '\r', '\n', '♪', '[', ']', '(', ')',
]

const mesclarConteudos = array => array.join(' ') //une os conteudos do array em uma unica string
const separarPorLinhas = todoConteudo => todoConteudo.split('\n') //separa os conteudos por quebra de linha
const separarPorPalavras = todoConteudo => todoConteudo.split(' ') //separa os conteudos por quebra de linha

fn.lerDiretorio(caminho)
    .then(fn.elementosTerminadosCom('.srt'))
    .then(fn.lerArquivos)
    .then(mesclarConteudos) 
    .then(separarPorLinhas)
    .then(fn.removerElementoSeVazio)
    .then(fn.removerElementoSeIncluir('-->'))
    .then(fn.removerElementoSeApenasNumero)
    .then(fn.removerSimbolos(simbolos))
    .then(mesclarConteudos)
    .then(separarPorPalavras)
    .then(fn.removerElementoSeVazio)
    .then(console.log)
