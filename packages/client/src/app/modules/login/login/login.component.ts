import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Logger, ILoggable } from '../../../shared/logger';
import { Router } from '@angular/router';

@Logger()
@Component({
  selector: 'fys-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, ILoggable {

  logger: Partial<Console>;
  public form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      ticketNumber: [null, Validators.required],
      accessCode: [null, Validators.required]
    });
  }

  ngOnInit() { }


  loginAsGuest() {
    this.logger.log('logging in as guest...');

    this.router.navigate(['']);
  }
}
