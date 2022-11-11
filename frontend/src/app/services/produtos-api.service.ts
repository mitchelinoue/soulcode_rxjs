import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from '../models/Produto';


@Injectable({
  providedIn: 'root'
})
export class ProdutosApiService {

  private readonly baseURL: string = 'http://localhost:3000/produtos'


  constructor(
    private http: HttpClient
  ) { }

  // Listar informações -> GET
  listarProdutos(){
    return this.http.get<Produto[]>(this.baseURL)

  }

  pegarProduto(idProduto: number){
    return this.http.get<Produto>(this.baseURL + '/' + idProduto)
  }

  criarProduto(prod: Produto){
    return this.http.post<Produto>(this.baseURL, prod)
  }

  atualizarProduto(prod: Produto, idProduto: number | undefined){
    return this.http.patch(this.baseURL + '/' + idProduto, prod)
  }

  deletarProduto(idProduto: number | undefined){
    
    return this.http.delete(`${this.baseURL}/${idProduto}`)
    
  }
}
