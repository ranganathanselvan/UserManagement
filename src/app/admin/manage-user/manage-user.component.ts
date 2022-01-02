import { Component, OnInit } from '@angular/core';
import { UserObject } from 'src/app/_models/user.object';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css'],
})
export class ManageUserComponent implements OnInit {
  allUsers: UserObject[];

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService
    ) {}

  ngOnInit(): void {
    const token: string | null = sessionStorage.getItem('token');
    this.authenticationService.setUser(token);

    this.userService.getAllUsers().subscribe((response) => {
      this.allUsers = response;
    });
  }
}
