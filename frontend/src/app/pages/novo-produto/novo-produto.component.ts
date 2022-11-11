import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
    private produtoService: ProdutosApiService,
    private sanackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  salvarProduto(){
    const produto: Produto = this.produtoForm.value

    this.produtoService.criarProduto(produto).subscribe(
      (prod) => {
        console.log(prod)
        this.sanackBar.open('Produto salvo com sucesso', 'ok!')
      }
    )

    setTimeout(() => {
      this.router.navigateByUrl('/produtos');
    }, 1000)
  }
}
