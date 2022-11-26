import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { catchError, EMPTY, from, map, Observable } from 'rxjs';
import { Borrow } from '../models/borrow';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class BorrowService {

  constructor(
    private firestore: AngularFirestore,
    private notification: NotificationService,
  ) { }

  public newBorrow(borrow: Borrow): Observable<any> {
    const promise = this.firestore.collection("borrow").add(borrow);

    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao cadastrar");
        console.log(error);
        return EMPTY;
      })
    )
  }


  public findAll(): Observable<any>{
    const promise = this.firestore.collection("borrow").get();

    return from(promise).pipe(

      map((response: any) => {

        return response.docs.map((doc:any) => { 
          const borrow: Borrow = doc.data() as Borrow;
          borrow.id = doc.id;
          return borrow;
        })

      }),
      catchError(error => {
        this.notification.showMessage("Erro ao buscar dados");
        console.log(error);
        return EMPTY;
      })
    )
  }

  public findById(id: string): Observable<any>{
    const promise = this.firestore.collection("borrow").doc(id).get();

    return from(promise).pipe(
      map(doc =>{
        const borrow: Borrow = doc.data() as Borrow;
        borrow.id = doc.id;
        return borrow;
      }),
      catchError(error => {
        this.notification.showMessage("Erro ao buscar pelo id");
        console.log(error);
        return EMPTY;
      })
    )
  }

  public deleteBorrow(id: string){
    const promise = this.firestore.collection("borrow").doc(id).delete();
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao excluir empréstimo");
        console.log(error);
        return EMPTY;
      })
    );
  }

  public updateBorrow(borrow: Borrow){
    const promise = this.firestore.collection("borrow").doc(borrow.id).update(borrow);
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao atualizar");
        console.log(error);
        return EMPTY;
      })
    );
  }
}
