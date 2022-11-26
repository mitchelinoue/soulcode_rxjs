import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { BookComponent } from './views/book/book.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { EditBorrowComponent } from './views/edit-borrow/edit-borrow.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { NewBorrowComponent } from './views/new-borrow/new-borrow.component';
import { RegisterUserComponent } from './views/register-user/register-user.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AuthGuard ],
    title: "Home | Bibliotech"
  },
  {
    path: 'login',
    component: LoginComponent,
    title: "Login | Bibliotech"
  },
  {
    path: 'register',
    component: RegisterUserComponent,
    title: "Cadastre-se | Bibliotech"
  },
  {
    path: 'books',
    component: BookComponent,
    canActivate: [ AuthGuard ],
    title: "Livros | Bibliotech"
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [ AuthGuard ],
    title: "Painel de Controle | Bibliotech"
  },
  {
    path: 'dashboard/new',
    component: NewBorrowComponent,
    canActivate: [ AuthGuard ],
    title: "Novo empréstimo | Bibliotech"
  },
  {
    path: 'dashboard/edit/:id',
    component: EditBorrowComponent,
    canActivate: [ AuthGuard ],
    title: "Editar empréstimo | Bibliotech"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
