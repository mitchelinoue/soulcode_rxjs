import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestarNumeroGuard implements CanActivate {
  //retornar true -> podeseguir
  // retornar false -> não pode seguir

  // constructor(
  //   private router:Router
  // ){}

  canActivate(
    route: ActivatedRouteSnapshot, // objeto que permite recuperar os parâmetros passados para a rota
    state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // saber se o id informado é um número ou não. Se for um número, pode seguir(true), caso contrário não pode(false)

      // precisa recuperar o parâmetro que guarda o valor do id
      const idProd = route.paramMap.get('idProduto')

      if(isNaN(Number(idProd))){
        // return this.router.navigateByUrl("/produto")
        return false
      }else{
        return true
      }
      

  }
  
}
