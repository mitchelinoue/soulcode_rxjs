import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  public bookForm: FormGroup;
  public isLoading: Boolean = false;
  public cover: string = ""

  displayedColumns = ['titulo', 'categoria', 'autor', 'isbn', 'excluir'];
  dataSource: Book[] = [] ;

  constructor(
    private fb: FormBuilder,
    private notification: NotificationService,
    private bookService: BookService,
    private router: Router,
    private uploadService: UploadService
  ) {
    this.bookForm = fb.group({
      titulo: ["",[Validators.required]],
      categoria: ["",[Validators.required]],
      autor: ["",[Validators.required]],
      isbn: ["",[Validators.required]],
    })
   }

  ngOnInit(): void {
    this.loadTable();
  }

  public createBook(): void{
    if(this.bookForm.valid) {
      const livro: Book = this.bookForm.value;
      livro.cover = this.cover;

      this.bookService.createBook(livro).subscribe((resp) => {
        this.notification.showMessage("Cadastrado com sucesso");
        this.loadTable();
      })
    } else {
      this.notification.showMessage("Dados inválidos")
    }
  }

  public uploadFile(event: any): void {
    this.isLoading = true; // Inicio do carregamento da foto
    const file: File = event.target.files[0];
    this.uploadService.uploadCover(file).subscribe(uploadResult => {
      this.isLoading = false // Quando entra nesta função o carregamento da foto foi concluido.
      const storageReference = uploadResult.ref;
      const promiseFileUrl = storageReference.getDownloadURL();
      promiseFileUrl.then((cover: string) => {
        this.cover = cover
      })
    })
  }

  private loadTable() {
    this.bookService.findAll().subscribe(books => {
      this.dataSource = books;
      console.log(this.dataSource)
    })
  }

  public deleteBook(id: string, coverName: string) {
    this.bookService.deleteBook(id, coverName).subscribe(response => {
      this.notification.showMessage("Excluído com sucesso");
      this.loadTable();
    })
    }

}
