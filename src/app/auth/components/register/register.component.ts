import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { AppStateInterface } from 'src/app/shared/types/appState.interface'
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface'
import { registerAction } from '../../store/actions/register.action'
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from '../../store/selectors'
import { RegisterRequestInterface } from '../../types/registerRequest.interface'

@Component({
  selector: 'mc-redister',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({})
  isSubmitting$: Observable<boolean>
  backendErrors$: Observable<BackendErrorsInterface | null>

  constructor(
    private formGroup: FormBuilder,
    private store: Store<AppStateInterface>
  ) {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
  }

  ngOnInit(): void {
    this.initializeFrorm()
  }

  initializeFrorm(): void {
    this.form = this.formGroup.group({
      username: ['', Validators.required],
      email: '',
      password: '',
    })
  }

  onSubmit(): void {
    const request: RegisterRequestInterface = {
      user: this.form.value,
    }
    this.store.dispatch(registerAction({ request }))
  }
}
