import path from 'path'
import { filter, last, map, Observable, take } from 'rxjs'
import fs from 'fs'

const filePaths: string[] = [
  path.join(__dirname, 'files', 'app_1.txt'),
  path.join(__dirname, 'files', 'app_2.txt'),
  path.join(__dirname, 'files', 'app_3.txt'),
  path.join(__dirname, 'files', 'app_4.txt'),
  path.join(__dirname, 'files', 'estilo_1.css'),
  path.join(__dirname, 'files', 'estilo_2.css'),
  path.join(__dirname, 'files', 'estilo_3.css'),
  path.join(__dirname, 'files', 'estilo_4.css'),
  path.join(__dirname, 'files', 'estrutura_1.html'),
  path.join(__dirname, 'files', 'estrutura_2.html'),
  path.join(__dirname, 'files', 'estrutura_3.html'),
  path.join(__dirname, 'files', 'estrutura_4.html')
]

const isCSS = /^((.|#|:){0,1}(\w+-{0,1})+\s*{(\s*(\w+-{0,1})+:\s*(\w+\s*)+;\s*)+\s*}\s*)/i
const isHTML = /^<!DOCTYPE html>/i



function lerArquivos(arquivos: string[]){

//Observables são fontes de dados que enviam dados/informações de forma contínua

// a classe observable recebe como parâmetro uma função responsável pela geração dos dados que o observable enviará

//subscriber é uma referência do dependente da informação

  const leitor = new Observable<string>((subscriber) => {

    // o método forEach serve para fazer um loop dentro de um array
    arquivos.forEach((arquivo) => {


      try{ // tratamento de erros (try/catch)

        //ReadFileSync fará a leitura de um arquivo a partir do caminho desse arquivo no seu computador
        const conteudo = fs.readFileSync(arquivo, { encoding: 'utf-8' })
        subscriber.next(conteudo) // responsável por mandar a mensagem de sucesso
        
        

      } catch(error){
        subscriber.error(`Não foi possível ler o arquivo que está no caminho ${arquivo}`) // responsável por mandar a mensagem de erro
      }


      
      
      /*
      envio de dados do Observables:
       - > 3 estágios
      - sucesso: o observalbe conseguiu realizar seu trabalho sem nenhum problema e enviou os dados com sucesso.

       - erro: o observable teve algum problema durante a sua execução e não conseguiu realizar sua tarefa de maneira satisfatória e não conseguiu enviar os dados. Quando um observable passa pelo estágio de erro, sua execução para automaticamente.

       - completo: o obsevable realizou todas as suas tarefas com sucesso e não possui mais nenhum dado para poder enviar.

       */
    })

    subscriber.complete() // responsável por mandar a mensagem de completo

  })

  return leitor
}



let obs = lerArquivos(filePaths)
/*
o método subscribe() dos observadores te permite acessar os valores que o obserable te envia de forma contínua
*/

/**
 * 1º -> Sucesso
 * 2º -> Erro
 * 3º -> Completo
 */

/*
Operadores são funções que serve para manipular os dados que os observables enviam
*/

//Utilizando algum operador do rxjs vamos extrair a primeira palavra de cada arquivo -> a função pipe serve para você passar os operadores do rxjs que modificarão os dados que o Observable retorna para você

// De todos os arquivos lidos, utilize um operador do rxjs para pegar apenas os arquivos CSS -> o operador filter() serve para filtrar determinadas informações que o observable envia

obs
.pipe(
  // map((texto) => {
  //  return texto.split(' ')[0]
  // }),
  // map((palavra) =>{
  //   return palavra.length
  // })

  // filter((txt) => {
  //   return isCSS.test(txt) && txt.length > 2000
  // })

  // filter((batata) => {
  //   return !isHTML.test(batata) && !isCSS.test(batata)
  // })

  // take(4) // pega somente 4 valores

  // first() // pega o primeiro valor
  // first((potato) => { // retorna o primeiro valor de todos que a função traria
  //   return isHTML.test(potato) 
  // })

  last() // retorna o último valor
)
.subscribe(
  (conteudoLido) => {
    console.log('---------- ARQUIVO LIDO COM SUCESSO ----------')
    console.log(conteudoLido)
    console.log('----------------------------------------------\n\n')
  },
  (erro) => {
    console.log('OCORREU UM ERRO NA EXECUÇÃO DO OBSERVABLE')
    console.log(erro)
  },
  () => { //função de complete nunca vai ter parâmetros
    console.log('TODOS OS ARQUIVOS FORAM LIDOS COM SUCESSO')
  }
)

// obs.subscribe(
//   (conteudoLido) => {
//     console.log(`Este arquivo possui ${conteudoLido.length} caracteres`)
//   }
// )
