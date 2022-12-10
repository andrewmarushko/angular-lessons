import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { RegisterComponent } from 'src/app/auth/components/register/register.component'
import { reducers } from 'src/app/auth/store/reducers'
import { BackendErrorsMessagesModule } from '../shared/modules/backendErrorMessages/backendErrorsMessages.module'
import { AuthService } from './services/auth.service'
import { RegisterEffect } from './store/effects/register.effects'

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([RegisterEffect]),
    BackendErrorsMessagesModule,
  ],
  declarations: [RegisterComponent],
  providers: [AuthService],
})
export class AuthModule {}
