import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesPage } from './pages.page';

const routes: Routes = [
  {
    path: 'pages',
    component: PagesPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      },
      {
        path: '', redirectTo: '/pages/home', pathMatch: 'full'
      }
    ]
  },
  {
    path: '', redirectTo: '/pages/home', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesPageRoutingModule { }
