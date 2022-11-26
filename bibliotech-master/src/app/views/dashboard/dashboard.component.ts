import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailsComponent } from 'src/app/components/details/details.component';
import { Book } from 'src/app/models/book';
import { Borrow } from 'src/app/models/borrow';
import { BorrowService } from 'src/app/services/borrow.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns = ['leitor', 'livro', 'dataEmprestimo', 'status', 'excluir', 'editar', 'capa'];

  dataSource: Borrow[] = [];
  

  constructor(
    private borrowService: BorrowService,
    private notification: NotificationService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.initializeTableBorrows();
  }

  private initializeTableBorrows():void{
    this.borrowService.findAll().subscribe(borrows=>{
      this.dataSource = borrows;
      console.log(borrows)
    });
  }

  public deleteBorrow(id: string): void{
    this.borrowService.deleteBorrow(id).subscribe(response =>{
      this.notification.showMessage("Apagado");
      this.initializeTableBorrows();
    })
  }

  public openDetails(book: Book): void{
    this.dialog.open(DetailsComponent, {
      width: "400px",
      data: book,
    })
  }

}
