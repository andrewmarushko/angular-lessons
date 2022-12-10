import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { AppStateInterface } from 'src/app/shared/types/appState.interface'
import { registerAction } from '../../store/actions/register.action'
import { isSubmittingSelector } from '../../store/selectors'

@Component({
  selector: 'mc-redister',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({})
  isSubmitting$: Observable<boolean>

  constructor(
    private formGroup: FormBuilder,
    private store: Store<AppStateInterface>
  ) {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    console.log('stream', this.isSubmitting$)
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
    this.store.dispatch(registerAction(this.form.value))
  }
}
