const path = require('path')
const fn = require('./funcoes')

const caminho = path.join(__dirname, '..', 'dados', 'legendas')

fn.lerDiretorio(caminho)
    .then(fn.elementosTerminadosCom('.srt'))
    .then(fn.lerArquivos)
    .then(conteudos => conteudos.join('\n')) //une os conteudos do array em uma unica string
    .then(todoConteudo => todoConteudo.split('\n')) //separa os conteudos por quebra de linha
    .then(fn.removerElementoSeVazio)
    .then(fn.removerElementoSeIncluir('-->'))
    .then(fn.removerElementoSeApenasNumero)
    .then(console.log)
