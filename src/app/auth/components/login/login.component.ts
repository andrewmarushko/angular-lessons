import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface'
import { loginAction } from '../../store/actions/login.actions'
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from '../../store/selectors'
import { LoginRequestInterface } from '../../types/loginRequest.interface'

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({})

  isSubmitting$: Observable<boolean>
  backendErrors$: Observable<BackendErrorsInterface | null>

  constructor(private formGroup: FormBuilder, private store: Store) {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
  }

  initializeForm(): void {
    this.form = this.formGroup.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onSubmit(): void {
    const request: LoginRequestInterface = {
      user: this.form.value,
    }
    this.store.dispatch(loginAction({ request }))
  }

  ngOnInit(): void {
    this.initializeForm()
  }
}
