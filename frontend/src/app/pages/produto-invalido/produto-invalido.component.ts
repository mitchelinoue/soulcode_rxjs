import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/models/Produto';
import { ProdutosApiService } from 'src/app/services/produtos-api.service';

@Component({
  selector: 'app-produto-invalido',
  templateUrl: './produto-invalido.component.html',
  styleUrls: ['./produto-invalido.component.css']
})
export class ProdutoInvalidoComponent implements OnInit {

  constructor(
    
  ) { }

  ngOnInit(): void {
  }

}
