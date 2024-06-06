import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {LoginModule} from '@login/login.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {RegistrationModule} from '@registration/registration.module';
import {CoreModule} from '@core/core.module';
import {GlobalModalModule} from '@app/global-modal/global-modal.module';
import {NotFoundComponent} from './not-found/not-found.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '@environments/environment';
import {CardModule} from '@app/card/card.module';

@NgModule({
    declarations: [
        AppComponent,
        NotFoundComponent
    ],
    imports: [
        BrowserAnimationsModule,
        CoreModule,
        AppRoutingModule,
        LoginModule,
        CardModule,
        RegistrationModule,
        FontAwesomeModule,
        GlobalModalModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the app is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
