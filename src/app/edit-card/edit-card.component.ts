import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss']
})
export class EditCardComponent implements OnInit {
  user: any = {};

  @Input() userData = {Username: this.user.Username, Password: this.user.Password, Email: this.user.Email, Birthday: this.user.Birthday}

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditCardComponent>,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((res: any) => {
      this.user = res;
      console.log(this.user);
      return this.user
    });
  }

  editUserProfile(): void {
    this.fetchApiData.editUser(this.userData).subscribe((res: any) => {
      this.dialogRef.close();
      this.snackBar.open('You have successfully edited your profile!', 'OK', {
        duration: 2000
      });
      console.log(res);
      localStorage.setItem('user', res.Name);
    }), (res: any) => {
      console.log(res)
      this.snackBar.open('Something went wrong :(. Please try again.', 'OK', {
        duration: 2000
      });
    }
  }
}
