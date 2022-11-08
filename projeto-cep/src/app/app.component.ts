import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CepUser } from './interfaces/CepUser';
import { CepService } from './services/cep.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cepForm: FormGroup = this.fb.group({
    cep: ['', [ Validators.required ]]
  })

  cepUser!: CepUser
  

  constructor(
    private fb: FormBuilder,
    private cepService: CepService,
    private snackBar: MatSnackBar
  ) {}

    procurarCep(){
      const cep = this.cepForm.get('cep')?.value

      this.cepService.procurarCep(cep).subscribe(
        (user) => {
          this.cepUser = user
        },
        (erro) => {
          
  
          if(erro instanceof HttpErrorResponse){
            if(erro.status == 404){
              this.snackBar.open(`O cep ${cep} não foi encontrado =( `, 'ok')
            }
          } 
        }
      )
    }
}
