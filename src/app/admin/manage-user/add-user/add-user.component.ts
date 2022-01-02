import { Component, OnInit } from '@angular/core';
import { RoleObject } from 'src/app/_models/role.object';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  allRoles: RoleObject[];

  constructor(
    private userService: UserService
    ) {}

  ngOnInit(): void {
    this.userService.getAllRoles().subscribe((response) => {
      this.allRoles = response;
    });
  }

}
