import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GithubUser, GithubUserRepo } from './interfaces/GithubUser';
import { GithubApiService } from './services/github-api.service';

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
  gUserRepo!: GithubUserRepo[]

  constructor(
    private fb: FormBuilder,
    private githubService: GithubApiService
  ) {}

  procurar(){
    const username = this.githubForm.get('username')?.value // recuperando o nome de usuário que deve ser procurado
    
    this.githubService.procurarUsuario(username).subscribe(
      (user) => {
        this.gUser = user
        
      }
    )

    this.githubService.procurarRepos(username).subscribe(
      (userRepo) => {
        this.gUserRepo = userRepo
        
      }
    )

  }


}
