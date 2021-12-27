import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../../_services/authentication.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { DataShareService } from 'src/app/_services/datashare.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private dataShareService: DataShareService
  ) {}

  ngOnInit(): void {}

  loginProgress: boolean = false;
  displayStyle: string = 'none';

  login: any = {
    username: null,
    password: null,
  };

  onFormSubmit() {
    this.loginProgress = true;
    this.displayStyle = 'inline';

    this.authenticationService
      .login(this.login.username, this.login.password)
      .subscribe({
        next: (result) => {
          console.log('Login success');
          if (result.data && result.data.token) {
            sessionStorage.setItem('token', result.data.token);
            this.authenticationService.setUser(result.data.token);
            this.dataShareService.storedUser.subscribe((value: User) => {
              if (value) {
                sessionStorage.setItem('currentUser', JSON.stringify(value));
                this.router.navigate(['/dashboard']);
              } else {
                console.log('Login failed');
              }
              this.loginProgress = false;
              this.displayStyle = 'none';
            });
          } else {
            this.loginProgress = false;
            this.displayStyle = 'none';
            console.log('Login failed');
          }
        },
        error: (err) => {
          this.loginProgress = false;
          this.displayStyle = 'none';
          console.log('Login failed ' + JSON.stringify(err));
        },
      });
  }
}
