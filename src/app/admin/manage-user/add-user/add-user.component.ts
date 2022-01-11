import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { RoleObject } from 'src/app/_models/role.object';
import { UserObject } from 'src/app/_models/user.object';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  allRoles: RoleObject[];
  selectedRoles: RoleObject[] = [];
  userObject: UserObject = new UserObject();
  password: string = '';
  isSuccess = false;
  isfailure = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.userService.getAllRoles().subscribe((response) => {
      this.allRoles = response;
    });
  }

  onSubmit(formUser: NgForm): void {
    if (formUser.invalid) {
      alert('Please fill all the required field.');
      return;
    }
    if (this.selectedRoles.length === 0) {
      alert('Please select atleast one role.');
      return;
    }

    var userParam = {
      "users": this.userObject,
      "password": this.password,
      "roles": this.selectedRoles
    }
    this.userService.createUser(userParam).subscribe((result) => {
      if (result.userId > 0) {
        this.isSuccess = true;
        formUser.reset();

        setTimeout(() => {
          this.isSuccess = false;
        }, 3000);
      } else {
        this.isfailure = true;
        setTimeout(() => {
          this.isfailure = false;
        }, 3000);
      }
    });
  }

  onReset(formUser: NgForm): void {
    this.isSuccess = false;
    this.isfailure = false;
    formUser.reset();
  }

  onCheckboxChange(e: any, role: RoleObject) {

    if (e.target.checked) {
      this.selectedRoles.push(role);
    } else {
      const index = this.selectedRoles.findIndex(x => x.roleId === role.roleId);
      if (index > -1) {
        this.selectedRoles.splice(index, 1);
      }
    }
  }
}
