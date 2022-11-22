import { Component, OnInit } from '@angular/core';
import { Collaborator } from 'src/app/models/collaborator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns = ['foto', 'nome', 'email', 'cpf', 'cargo', 'setor', 'excluir', 'editar', 'detalhes'];
  dataSource: Collaborator[] = [
    {
      nome: "Mitchel Inoue",
      email: "mitchel@mail.com",
      cpf: "123.456.789-10",
      cargo: "Engenheiro Civil",
      setor: "Obras",
      estado: "SP",
      cidade: "São Paulo",
      remuneracao: 100000,
      dataNascimento: new Date(),
      fotoUrl: "https://avatars.githubusercontent.com/u/107430805?v=4"
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
