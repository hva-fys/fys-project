import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      ticketNumber: [null, Validators.required],
      accessCode: [null, Validators.required]
    });
  }

  login(value) {
    // this.router.navigate(['']);
    alert('Welcome Robert!');
  }


  loginAsGuest() {
    // this.router.navigate(['']);
    alert('Welcome guest!');
  }
}
