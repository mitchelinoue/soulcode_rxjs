import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interfaceFilmes } from '../Interface/InterfaceFilmes';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private readonly baseURL: string = 'https://api.themoviedb.org/3/movie/'
  private readonly apiKey: string = '?api_key=6859f803f325a08970ed2279e0b7bdc2'
  private readonly baseSearchURL: string = 'https://api.themoviedb.org/3/search/movie/'
  private readonly query: string = '&query='

  url:string = `${this.baseURL}now_playing${this.apiKey}&language=pt-BR`

  constructor(private http: HttpClient) { }

  procurarFilme(filme: string){

    return this.http.get<interfaceFilmes[]>(`${this.baseSearchURL}${this.apiKey}${this.query}${filme}&language=pt-BR`)
  }
  
}
