import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { RegisterComponent } from 'src/app/auth/components/register/register.component'
import { reducers } from 'src/app/auth/store/reducers'
import { BackendErrorsMessagesModule } from '../shared/modules/backendErrorMessages/backendErrorsMessages.module'
import { PersistanceService } from '../shared/services/persistance.service'
import { LoginComponent } from './components/login/login.component'
import { AuthService } from './services/auth.service'
import { GetCurrentUserEffects } from './store/effects/getCurrentUser.effects'
import { LoginEffect } from './store/effects/login.effects'
import { RegisterEffect } from './store/effects/register.effects'

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([
      RegisterEffect,
      LoginEffect,
      GetCurrentUserEffects,
    ]),
    BackendErrorsMessagesModule,
  ],
  declarations: [RegisterComponent, LoginComponent],
  providers: [AuthService, PersistanceService],
})
export class AuthModule {}
