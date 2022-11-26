import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { catchError, EMPTY, from, Observable } from 'rxjs';
import { NotificationService } from './notification.service';
import { GoogleAuthProvider } from 'firebase/auth'
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private firebaseAuth: AngularFireAuth,
    private notification: NotificationService
  ) { }

    authenticateByGoogle(): Observable<any>{
      const provider = new GoogleAuthProvider();
      const promise = this.firebaseAuth.signInWithPopup(provider);

      return from(promise).pipe(
        catchError(error => {
          this.notification.showMessage("Erro ao autenticar com Google");
          console.log(error);
          return EMPTY;
        })
      )
    }

    public authenticateByEmailPassword(user: User){
      const { email, senha} = user
      const promise =  this.firebaseAuth.signInWithEmailAndPassword(email, senha)
      return from(promise).pipe(
        catchError(error => {
          if(error.code == "auth/user-not-found"){
            this.notification.showMessage("Usuario não cadastrado")
          } else if (error.code == "auth/wrong-password"){
            this.notification.showMessage("Senha incorreta")
          } else {
            this.notification.showMessage("Erro na autenticação")
            console.error(error)
          }
          return EMPTY
        })
      )
    }
  

    public createUser(user: User){
      const { email, senha } = user
      const promise = this.firebaseAuth.createUserWithEmailAndPassword(email, senha)
      return from(promise).pipe(
        catchError(error => {
          this.notification.showMessage("Erro ao cadastrar usuario")
          console.error(error)
          return EMPTY
        })
      )
    }
  
    public logout() {
      const promise = this.firebaseAuth.signOut()
      return from(promise)
    }
}

