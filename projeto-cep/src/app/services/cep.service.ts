import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CepUser } from '../interfaces/CepUser';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  private readonly baseURL: string = 'https://viacep.com.br/ws/'

  constructor(

      private http: HttpClient 
    
  ) { }

    procurarCep(cep: string){

      return this.http.get<CepUser>(`${this.baseURL}${cep}/json/`)
    }

}
