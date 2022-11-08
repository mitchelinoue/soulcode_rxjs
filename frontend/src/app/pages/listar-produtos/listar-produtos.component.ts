import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/models/Produto';
import { ProdutosApiService } from 'src/app/services/produtos-api.service';

@Component({
  selector: 'app-listar-produtos',
  templateUrl: './listar-produtos.component.html',
  styleUrls: ['./listar-produtos.component.css']
})
export class ListarProdutosComponent implements OnInit {

  pList: Produto[] = []

  constructor(
    private produtosService: ProdutosApiService
  ) { }

  ngOnInit():void { // é chamado quando o componente foi colocado na tela (renderizado)
    this.produtosService.listarProdutos().subscribe(
      (prods) => {
        console.log(prods)
        this.pList = prods
      }
    )
  }
}
