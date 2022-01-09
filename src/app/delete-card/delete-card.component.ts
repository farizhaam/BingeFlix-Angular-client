import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-card',
  templateUrl: './delete-card.component.html',
  styleUrls: ['./delete-card.component.scss']
})
export class DeleteCardComponent implements OnInit {
   /**
    * All constructor items are documented as properties
    * @ignore
    */
  constructor(    
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router,) { }

    /**
    * Initializes the component
    * @ignore
    */
  ngOnInit(): void {
  }
   /**
    * Deregister the user by invoking the service deleteUser which removes a user from the database.
    * A snack bar element is shown, holding a message with the result of the operation.
    */
  deleteUser(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.deleteUser(user).subscribe((res: any) => {
      this.snackBar.open(`You profile ${user} has been deleted`, 'OK', {
        duration: 2000
      });
    });
    localStorage.clear();
    this.router.navigate(['welcome']);
  }
}
