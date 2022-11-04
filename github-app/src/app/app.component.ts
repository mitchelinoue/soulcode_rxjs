import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GithubUser, GithubUserRepo } from './interfaces/GithubUser';
import { GithubApiService } from './services/github-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  githubForm: FormGroup = this.fb.group({
    username: ['', [ Validators.required ]]
  })

  gUser!: GithubUser // undefined
  gUserRepo: GithubUserRepo[] = []

  constructor(
    private fb: FormBuilder,
    private githubService: GithubApiService,
    private snackBar: MatSnackBar // componente do Material para mostrar mensagens
  ) {}

  procurar(){
    const username = this.githubForm.get('username')?.value // recuperando o nome de usuário que deve ser procurado
    

    // ordem das funções dentro do subscribe: success -> error -> complete
    this.githubService.procurarUsuario(username).subscribe(
      (user) => {
        this.gUser = user
      },
      (erro) => {
        // HttpErrorResponse - preciso saber se meu erro vem dessa classe

        if(erro instanceof HttpErrorResponse){
          if(erro.status == 404){
            this.snackBar.open(`Usuário ${username} não foi encontrado =( `, 'ok')
          }
        } 
      }
    )

    this.githubService.procurarRepos(username).subscribe(
      (userRepo) => {
        this.gUserRepo = userRepo
        
      }
    )

  }


}
