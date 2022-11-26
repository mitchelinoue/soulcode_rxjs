import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NotificationService } from './notification.service';
import { catchError, EMPTY, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
    private storage: AngularFireStorage, 
    private notification: NotificationService,
  ) { }

  public uploadCover(cover: File) {
    const promise = this.storage.upload(`covers/${Date.now()}`, cover)
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro no envio do arquivo")
        console.error(error)
        return EMPTY
      })
    )
  }
}
