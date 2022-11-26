import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Book } from '../models/book';
import { catchError, EMPTY, from, Observable, map } from 'rxjs';
import { getStorage, ref, deleteObject } from "firebase/storage";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private firestore: AngularFirestore,
    private notification: NotificationService,
  ) { }

  public createBook(book: Book): Observable<any>{
    const promise = this.firestore.collection("books").add(book);

    return from(promise).pipe(
      catchError(error =>{
        this.notification.showMessage("Erro ao cadastrar");
        console.log(error);
        return EMPTY;
      })
    )
  }

  public findAll() {
    const promise = this.firestore.collection('books').get();

    return from(promise).pipe(
      map((response: any) => {
        return response.docs.map((doc: any) => {
          const livros: Book = doc.data() as Book;
          livros.id = doc.id
          return livros;
        })
      }),

      catchError(error => {
        this.notification.showMessage("Erro ao buscar os dados.")
        console.log(error);
        return EMPTY
      })
    )
  }

  
  public deleteBook(id: string, coverName: string) {
    const promise = this.firestore.collection('books').doc(id).delete();

    const storage = getStorage();
    const foto = ref(storage, coverName);
    deleteObject(foto).then(() => {
      this.notification.showMessage("Excluido com sucesso");
    }).catch((error) => {
      console.log(error)
      this.notification.showMessage("Erro ao excluir foto");
    })



    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao excluir")
        console.error(error)
        return EMPTY
      })
    )
  }


  updateBook(book: Book) {
    const promise = this.firestore.collection('books').doc(book.id).update(book)
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao Atualizar")
        console.error(error);
        return EMPTY
      })
    )
  }
  


}


