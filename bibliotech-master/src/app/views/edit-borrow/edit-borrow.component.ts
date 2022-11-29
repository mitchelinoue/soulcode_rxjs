import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { Book } from 'src/app/models/book';
import { Borrow } from 'src/app/models/borrow';
import { BookService } from 'src/app/services/book.service';
import { BorrowService } from 'src/app/services/borrow.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-edit-borrow',
  templateUrl: './edit-borrow.component.html',
  styleUrls: ['./edit-borrow.component.css']
})
export class EditBorrowComponent implements OnInit {

  public borrow!: Borrow;

  public bookC!: Book;

  public books: Book[] = [];

  constructor(
    private notification: NotificationService,
    private borrowService: BorrowService,
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
  ) { }

  ngOnInit(): void {
    this.initializeFields();
    this.showBooks();
  }

  private initializeFields(): void{
    const id = this.route.snapshot.params["id"];
    this.borrowService.findById(id).subscribe(borrow => {
      this.borrow = borrow;
    })
  }

  public updateBorrow(form: NgForm):void{
    if(form.valid){
      this.borrowService.updateBorrow(this.borrow).subscribe(response => {
        this.notification.showMessage("Atualizado com sucesso");
        this.router.navigateByUrl("/dashboard");
      })
    } else {
      this.notification.showMessage("Dados inválidos");
    }
  }

  public updateBorrowBook(id: string | undefined){
      this.bookService.findById(id).subscribe(book => {
        this.borrow.livro = book;
    })
  }

  public showBooks(){
    this.bookService.findAll().subscribe(response =>{
      this.books = response
    })
   
  }

}
