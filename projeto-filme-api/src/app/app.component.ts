import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { interfaceFilmes } from './Interface/InterfaceFilmes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieService } from './services/movie.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  
  filmeForm: FormGroup = this.fb.group({
    filme: ['', [Validators.required]]
  })

  fList: interfaceFilmes[] = [];
  list: interfaceFilmes[] = [];

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private movieService: MovieService,
    private snackBar: MatSnackBar
    ){} 

  ngOnInit(){
    
    this.http.get(this.movieService.url).subscribe( 
      (info:any) => {
      
      this.list = info.results
    })
  }

  search(){
    const filme = this.filmeForm.get('filme')?.value
    this.movieService.procurarFilme(filme).subscribe(
      (info:any) => {
        this.fList = info.results
      },
      (erro) => {
        if(erro instanceof HttpErrorResponse){
          if(erro.status == 404){
            this.snackBar.open(`O filme ${filme} não foi encontrado =( `, 'ok')
          }
        } 
      }
    )
  }
}
