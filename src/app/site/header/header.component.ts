import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { DataShareService } from 'src/app/_services/datashare.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  currentUser: User;
  isUserLoggedIn: boolean;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private dataShareService: DataShareService
  ) {}

  ngOnInit(): void {
    this.dataShareService.storedUser.subscribe((value: User) => {
      this.currentUser = value;
    });
    this.dataShareService.userLoggedin.subscribe((value: boolean) => {
      this.isUserLoggedIn = value;
    });
  }

  logout() {    
    this.isUserLoggedIn = false;
    this.authenticationService.logout();
    this.router.navigate(['/home']);
  }
}
