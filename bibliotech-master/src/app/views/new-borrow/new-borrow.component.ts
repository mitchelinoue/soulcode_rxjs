import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { Borrow } from 'src/app/models/borrow';
import { BookService } from 'src/app/services/book.service';
import { BorrowService } from 'src/app/services/borrow.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-new-borrow',
  templateUrl: './new-borrow.component.html',
  styleUrls: ['./new-borrow.component.css']
})
export class NewBorrowComponent implements OnInit {

  public formBorrow: FormGroup;

  books: Book[] = [];

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router,
    private notification: NotificationService,
    private borrowService: BorrowService,
  ) {
    this.formBorrow = fb.group({
      leitor: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      telefone: ["", [Validators.required]],
      status: ["", [Validators.required]],
      livro:["", [Validators.required]],
    })
   }

  ngOnInit(): void {
    this.showBooks();
  }

  public newBorrow():void{
    if(this.formBorrow.valid){
      const borrow: Borrow = this.formBorrow.value;
      borrow.data = new Date().toLocaleDateString('pt-br');
      this.borrowService.newBorrow(borrow).subscribe(response => {
        this.notification.showMessage("Cadastrado com sucesso");
        this.router.navigateByUrl("/dashboard");
      })

      
    } else {
      this.notification.showMessage("Dados inválidos");
    }
  }

  public showBooks(){
    this.bookService.findAll().subscribe(response =>{
      this.books = response
    })
   
  }


}
