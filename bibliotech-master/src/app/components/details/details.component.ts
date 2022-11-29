import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from 'src/app/models/book';
import { Borrow } from 'src/app/models/borrow';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public book: Book,
  ) { }

  ngOnInit(): void {
  }

}