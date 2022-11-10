import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Produto } from 'src/app/models/Produto';
import { ProdutosApiService } from 'src/app/services/produtos-api.service';

@Component({
  selector: 'app-novo-produto',
  templateUrl: './novo-produto.component.html',
  styleUrls: ['./novo-produto.component.css']
})
export class NovoProdutoComponent implements OnInit {

  produtoForm: FormGroup = new FormGroup({
    descricao: new FormControl('', [ Validators.required ]),
    foto: new FormControl(''),
    nome: new FormControl('', [ Validators.required ]),
    preco: new FormControl('', [ Validators.required ])
  })

  constructor(
    private produtoService: ProdutosApiService
  ) { }

  ngOnInit(): void {
  }

  salvarProduto(){
    const produto: Produto = this.produtoForm.value

    this.produtoService.criarProduto(produto).subscribe(
      (prod) => {
        console.log(prod)
        alert('Produto salvo com sucesso') // desafio subsyituir por snackbar
      }
    )
  }
}
