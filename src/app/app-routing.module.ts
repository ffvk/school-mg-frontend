import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },

  {
    path: 'login',
    loadChildren: () =>
      import('./app-pages/login/login.module').then((m) => m.LoginPageModule),
  },  {
    path: 'home',
    loadChildren: () => import('./app-pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./app-pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./app-pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'product',
    loadChildren: () => import('./app-pages/product/product.module').then( m => m.ProductPageModule)
  },
  {
    path: 'order',
    loadChildren: () => import('./app-pages/order/order.module').then( m => m.OrderPageModule)
  },
  {
    path: 'subjects',
    loadChildren: () => import('./app-pages/subjects/subjects.module').then( m => m.SubjectsPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
