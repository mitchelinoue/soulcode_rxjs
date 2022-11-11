import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Produto } from 'src/app/models/Produto';
import { ProdutosApiService } from 'src/app/services/produtos-api.service';
import { ListarProdutosComponent } from '../listar-produtos/listar-produtos.component';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit { 
  
  // injetar um objeto que permite acessar os parâmetros da rota

  produto!: Produto
    

  altImg: string = 'https://igp.rs.gov.br/themes/modelo-noticias/images/outros/GD_imgSemImagem.png'

  produtoForm: FormGroup = new FormGroup({
    descricao: new FormControl('', [ Validators.required ]),
    foto: new FormControl(''),
    nome: new FormControl('', [ Validators.required ]),
    preco: new FormControl('', [ Validators.required ])
  })

  constructor(
    private rota: ActivatedRoute, // ActivatedRoute permite acessar as informações (parâmetros) da rota que está ativa no momento
    private produtosService: ProdutosApiService,
    private snackBar: MatSnackBar,
    private router: Router
    
  ) { }

  ngOnInit(): void { // é executado quando o componente é renderizado

    // paraMap é um objeto que possui acesso a todos os parâmetros da rota atual
    //get funciona para pegar o valor de um parâmetro de uma rota atual
    const idProduto = this.rota.snapshot.paramMap.get('idProduto') as string

    this.produtosService.pegarProduto(parseInt(idProduto)).subscribe(
      (prod) => {
        console.log(prod)
        this.produto = prod

        this.produtoForm.setValue({
          descricao: prod.descricao,
          nome: prod.nome,
          foto: prod.foto,
          preco: prod.preco
        })
      },
      (erro) => {
        if(erro instanceof HttpErrorResponse){
          if(erro.status == 404){
            this.snackBar.open(' 404 O produto procurado não existe :( ', 'ok')
            this.router.navigateByUrl('/produtos/invalido');
          }
        }
      }
    )
  }

  public atualizar(id:number | undefined){
    this.produto = this.produtoForm.value
    this.produtosService.atualizarProduto(this.produto, id).subscribe(
      (prod) => {
        prod = this.produto
      }
    )
  }
  deletar(){
    this.produtosService.deletarProduto(this.produto.id as number).subscribe(
      ()=>{
        this.router.navigateByUrl('/produtos')
      }
    )
  }
}
