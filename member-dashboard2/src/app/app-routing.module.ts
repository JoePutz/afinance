import {NgModule} from '@angular/core';
import {NavigationError, Router, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '@login/login.component';
import {RegistrationComponent} from '@registration/registration.component';
import {AppRoutingTitles} from './app-routing.titles';
import {filter} from 'rxjs/operators';
import {NotFoundComponent} from '@app/not-found/not-found.component';
import {
  RegistrationConfirmationComponent
} from '@registration/registration-confirmation/registration-confirmation.component';
import {ForgotPasswordComponent} from '@login/forgot-password/forgot-password.component';
import {ActivateCardComponent} from '@app/card/activate-card/activate-card.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('@dashboard/dashboard.module').then(m => m.DashboardModule),
    data: {
      title: AppRoutingTitles.DASHBOARD
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: AppRoutingTitles.LOGIN
    }
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data: {
      title: AppRoutingTitles.FORGOT_PASSWORD
    }
  },
  {
    path: 'activate',
    component: ActivateCardComponent,
    data: {
      title: AppRoutingTitles.ACTIVATE_CARD
    }
  },
  {
    path: 'get-started',
    component: RegistrationComponent,
    data: {
      title: AppRoutingTitles.GET_STARTED
    }
  },
  {
    path: 'register',
    redirectTo: 'get-started'
  },
  {
    path: 'confirmation',
    component: RegistrationConfirmationComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
  constructor(private router: Router) {
    router.events.pipe(filter(e => e instanceof NavigationError))
      .subscribe((e) => {
        if (e instanceof NavigationError) {
          console.error(`Route not found: '${e.url}'`);
        }
      });
  }
}
