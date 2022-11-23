import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { LoginComponent } from './view/login/login.component';
import { CadastrarUsuarioComponent } from './view/cadastrar-usuario/cadastrar-usuario.component';
import { HomeComponent } from './view/home/home.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material/material.module';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { NewCollaboratorComponent } from './view/new-collaborator/new-collaborator.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'
import { EditCollaboratorComponent } from './view/edit-collaborator/edit-collaborator.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastrarUsuarioComponent,
    HomeComponent,
    HeaderComponent,
    DashboardComponent,
    NewCollaboratorComponent,
    EditCollaboratorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    AngularFirestoreModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
