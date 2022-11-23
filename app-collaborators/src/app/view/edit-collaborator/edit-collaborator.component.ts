import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Collaborator } from 'src/app/models/collaborator';
import { CollaboratorService } from 'src/app/services/collaborator.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-edit-collaborator',
  templateUrl: './edit-collaborator.component.html',
  styleUrls: ['./edit-collaborator.component.css']
})
export class EditCollaboratorComponent implements OnInit {

  public collaborator!: Collaborator;

  constructor(
    private notification: NotificationService,
    private collaboratorService: CollaboratorService,
    private router: Router,
    private route: ActivatedRoute,
    ) {}

  ngOnInit(): void {
    this.initializeFields();
  }

  private initializeFields(): void{
    const id = this.route.snapshot.params["id"];
    this.collaboratorService.findById(id).subscribe(collaborator => {
      this.collaborator = collaborator;
    })
  }

  public updateCollaborator(form: NgForm):void{
    if(form.valid){
      // enviar para o banco de dados
      this.collaboratorService.updateCollaborator(this.collaborator).subscribe(response => {
        this.notification.showMessage("Atualizado com sucesso");
        this.router.navigateByUrl("/dashboard");
      })
    } else {
      this.notification.showMessage("Dados inválidos");
    }
  }





}

