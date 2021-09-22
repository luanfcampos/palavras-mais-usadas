const path = require('path')
const fn = require('./funcoes')

const caminho = path.join(__dirname, '..', 'dados', 'legendas')

const simbolos = [
    '.', '?', '-', ',', '"', '_', '<i>', '</i>', '\r', '\n', '♪', '[', ']', '(', ')',
]

fn.lerDiretorio(caminho)
    .then(fn.elementosTerminadosCom('.srt'))
    .then(fn.lerArquivos)
    .then(fn.mesclarConteudos) 
    .then(fn.separarPor('\n'))
    .then(fn.removerElementoSeVazio)
    .then(fn.removerElementoSeIncluir('-->'))
    .then(fn.removerElementoSeApenasNumero)
    .then(fn.removerSimbolos(simbolos))
    .then(fn.mesclarConteudos)
    .then(fn.separarPor(' '))
    .then(fn.removerElementoSeVazio)
    .then(console.log)
