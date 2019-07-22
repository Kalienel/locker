import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: '', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule' },
  { path: 'registrar', loadChildren: './pages/registrar/registrar.module#RegistrarPageModule' },
  { path: 'status', loadChildren: './page/status/status.module#StatusPageModule' },
  { path: 'estabelecimento/:item', loadChildren: './pages/estabelecimento/estabelecimento.module#EstabelecimentoPageModule' },
  { path: 'estoque', loadChildren: './pages/estoque/estoque.module#EstoquePageModule' },
  { path: 'confirmada', loadChildren: './pages/confirmada/confirmada.module#ConfirmadaPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
