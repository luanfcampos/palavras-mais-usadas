const path = require('path')
const fn = require('./funcoes')

const caminho = path.join(__dirname, '..', 'dados', 'legendas')

fn.lerDiretorio(caminho)
    .then(arquivos => fn.elementosTerminadosCom(arquivos, '.srt'))
    .then(arquivosSTR => fn.lerArquivos(arquivosSTR))
    .then(conteudos => conteudos.join('\n')) //junta os conteudos do array em uma unica string
    .then(todoConteudo => todoConteudo.split('\n')) //separa os conteudos por quebra de linha
    .then(fn.removerElementoSeVazio)
    .then(fn.removerElementoSeIncluir('-->'))
    .then(fn.removerElementoSeApenasNumero)
    .then(console.log)
