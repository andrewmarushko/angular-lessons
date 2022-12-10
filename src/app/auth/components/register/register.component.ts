import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { registerAction } from '../../store/actions/register.action'

@Component({
  selector: 'mc-redister',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({})

  constructor(private formGroup: FormBuilder, private store: Store) {}

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
