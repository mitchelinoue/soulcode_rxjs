import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { CadastrarUsuarioComponent } from './view/cadastrar-usuario/cadastrar-usuario.component';
import { HomeComponent } from './view/home/home.component';
import { LoginComponent } from './view/login/login.component';
import { DashboardComponent } from './view/dashboard/dashboard.component'
import { NewCollaboratorComponent } from './view/new-collaborator/new-collaborator.component';

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
    title: "Home | Collaborators"
  },
  {
    path: 'login',
    component: LoginComponent,
    title: "Login | Collaborators"
  },
  {
    path: 'cadastrar',
    component: CadastrarUsuarioComponent,
    title: "Cadastre-se | Collaborators"
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [ AuthGuard ],
    title: "Painel de Controle | Collaborators"
  },
  {
    path: 'dashboard/new',
    component: NewCollaboratorComponent,
    canActivate: [ AuthGuard ],
    title: "Novo colaborador | Collaborators"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
