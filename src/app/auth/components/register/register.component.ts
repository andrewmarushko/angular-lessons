import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'mc-redister',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({})

  constructor(private formGroup: FormBuilder) {}

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
    console.log('submited', this.form.value)
  }
}
