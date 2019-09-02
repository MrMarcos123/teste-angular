import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TelaInicialComponent } from './tela-inicial/tela-inicial.component';
import { ForumComponent } from './forum/forum.component';
import { ComantelaComponent } from './comantela/comantela.component';
import { PerfilComponent } from './perfil/perfil.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'paginaInicial', component: TelaInicialComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'comando', component: ComantelaComponent },
  { path: 'perfil', component: PerfilComponent }
]; //TODAS AS ROTAS

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
