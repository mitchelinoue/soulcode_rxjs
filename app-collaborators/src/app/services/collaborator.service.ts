import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Collaborator } from '../models/collaborator';
import { EMPTY, from, Observable } from 'rxjs';
import { NotificationService } from './notification.service';
import { catchError, map } from 'rxjs/operators';
import { getStorage, ref, deleteObject } from "firebase/storage";

@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {

  constructor(
    private firestore: AngularFirestore,
    private notification: NotificationService,
    ) { }

  public createCollaborator(collaborator: Collaborator): Observable<any> {
    const promise = this.firestore.collection("collaborators").add(collaborator);

    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao cadastrar");
        console.log(error);
        return EMPTY;
      })
    )
  }

  public findAll(): Observable<any>{
    const promise = this.firestore.collection("collaborators").get();

    return from(promise).pipe(

      map((response: any) => {

        return response.docs.map((doc:any) => { 
          const collaborator: Collaborator = doc.data() as Collaborator;
          collaborator.id = doc.id;
          return collaborator;
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
    const promise = this.firestore.collection("collaborators").doc(id).get();

    return from(promise).pipe(
      map(doc =>{
        const collaborator: Collaborator = doc.data() as Collaborator;
        collaborator.id = doc.id;
        return collaborator;
      }),
      catchError(error => {
        this.notification.showMessage("Erro ao buscar pelo id");
        console.log(error);
        return EMPTY;
      })
    )
  }

  public deleteCollaborator(id: string, fotoName: string){
    const promise = this.firestore.collection("collaborators").doc(id).delete();

    const storage = getStorage();
    const foto = ref(storage, fotoName);
    console.log(foto)
    console.log(storage)
    deleteObject(foto).then(() => {
      this.notification.showMessage("Excluido com sucesso");
    }).catch((error) => {
      console.log(error)
      this.notification.showMessage("Erro ao excluir foto");
    })

    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao excluir dados colaborador");
        console.log(error);
        return EMPTY;
      })
    );
  }

  public updateCollaborator(collaborator: Collaborator){
    const promise = this.firestore.collection("collaborators").doc(collaborator.id).update(collaborator);
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao atualizar");
        console.log(error);
        return EMPTY;
      })
    );
  }



  
}
