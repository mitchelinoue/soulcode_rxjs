import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup;

  constructor(
    fb: FormBuilder, 
    private authService: AuthService,
    private notification: NotificationService,
    private router: Router,
    ) { 
    this.formLogin = fb.group({
      email: ['', [Validators.required], Validators.email],
      senha: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  public signInGoogle(): void{
    this.authService.authenticateByGoogle().subscribe(credentials => {
      this.notification.showMessage("Autenticado com Google");
    })

    this. router.navigateByUrl("/home")
  }

  public signInEmailAndPassword(): void {
    if(this.formLogin.valid){
      const user: User = this.formLogin.value
      this.authService.authenticateByEmailAndPassword(user).subscribe( credentials =>{
        this.notification.showMessage("Autenticado com email e senha");
        this. router.navigateByUrl("/home")
      });
    } else {
      this.notification.showMessage("Dados inválidos")
    }
  }




}
