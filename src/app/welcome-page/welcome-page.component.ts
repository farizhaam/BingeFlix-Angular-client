import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }


  /**
   * open modal with {@link UserRegistrationFormComponent}
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
    // Assigning the dialog a width
      width: '280px'
    });
  }

  /**
   * open modal with {@link LoginFormComponent}
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
    // Assigning the dialog a width
      width: '280px'
    });
  }
}
