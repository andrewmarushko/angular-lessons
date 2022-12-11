import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgModule, OnInit } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { EffectsModule } from '@ngrx/effects'
import { Store, StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { AppRoutingModule } from 'src/app/app-routing.module'
import { AppComponent } from 'src/app/app.component'
import { AuthModule } from 'src/app/auth/auth.module'
import { environment } from 'src/environments/environment'
import { getCurrentUserAction } from './auth/store/actions/getCurrentUser.actions'
import { TopBarModule } from './shared/modules/topBar/topBar.module'
import { AuthInterceptor } from './shared/services/authInterceptor.service'
import { PersistanceService } from './shared/services/persistance.service'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    TopBarModule,
    HttpClientModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [
    PersistanceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule implements OnInit {
  constructor(private store: Store) {
    this.store.dispatch(getCurrentUserAction())
  }

  ngOnInit(): void {}
}
