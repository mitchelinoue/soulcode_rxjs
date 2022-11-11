import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Produto } from 'src/app/models/Produto';
import { ProdutosApiService } from 'src/app/services/produtos-api.service';

@Component({
  selector: 'app-listar-produtos',
  templateUrl: './listar-produtos.component.html',
  styleUrls: ['./listar-produtos.component.css']
})
export class ListarProdutosComponent implements OnInit {
  altImg: string = 'https://igp.rs.gov.br/themes/modelo-noticias/images/outros/GD_imgSemImagem.png'
  pList: Produto[] = []

  constructor(
    private produtosService: ProdutosApiService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit():void { // é chamado quando o componente foi colocado na tela (renderizado)
    this.produtosService.listarProdutos().subscribe(
      (prods) => {
        this.pList = prods
      }
    )
  }

  deletar(id: number | undefined){
    this.produtosService.deletarProduto(id).subscribe(
      ()=>{
        window.location.reload();
      }
    )
  }

}
