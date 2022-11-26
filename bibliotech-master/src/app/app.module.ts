import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { HeaderComponent } from './components/header/header.component';
import { RegisterUserComponent } from './views/register-user/register-user.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { EditBorrowComponent } from './views/edit-borrow/edit-borrow.component';
import { NewBorrowComponent } from './views/new-borrow/new-borrow.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { DetailsComponent } from './components/details/details.component';
import { BookComponent } from './views/book/book.component';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../environments/environment';
import { AvatarPipe } from './pipes/avatar.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterUserComponent,
    DashboardComponent,
    EditBorrowComponent,
    NewBorrowComponent,
    HomeComponent,
    LoginComponent,
    DetailsComponent,
    BookComponent,
    AvatarPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule,
    MaterialModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
