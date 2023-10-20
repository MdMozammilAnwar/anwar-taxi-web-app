import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
    { 
        path: '', 
        redirectTo: '/signin', 
        pathMatch: 'full' 
      },
      { 
        path: 'user-dashboard', 
        loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) 
      },
      { 
        path: 'driver-dashboard', 
        loadChildren: () => import('./components/driver-dashboard/driver-dashboard.module').then(m => m.DriverDashboardModule) 
      },
      { 
        path: 'about', 
        loadChildren: () => import('./components/about/about.module').then(m => m.AboutModule) 
      },
      { 
        path: 'signin', 
        loadChildren: () => import('./components/sign-in/sign-in.module').then(m => m.SignInModule) 
      },
      { 
        path: 'signup', 
        loadChildren: () => import('./components/sign-up/sign-up.module').then(m => m.SignUpModule) 
      },
      { 
        path: '**', 
        loadChildren: () => import('./components/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule) 
      }
];
