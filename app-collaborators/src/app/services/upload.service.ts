import { Injectable } from '@angular/core';
import { from, EMPTY, Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
    private storage: AngularFireStorage,
    private notification: NotificationService
  ) { }

  public uploadFoto(photo: File): Observable<any> {
    const promise = this.storage.upload(`fotos/${Date.now()}`, photo);
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro no envio do arquivo")
        console.log(error);
        return EMPTY
      })
    )
  }



}
