import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { EditCardComponent } from '../edit-card/edit-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DeleteCardComponent } from '../delete-card/delete-card.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  favMovies: any = [];
  user: any = {};
  favorites: any[] = [];
  constructor(    
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.getUser();
    // this.getFav();
    // this.getMovies();
  }

  getUser(): void {
    let user = JSON.parse(localStorage.getItem('user') || '');
    this.fetchApiData.getUser(user.Username).subscribe((res: any) => {
      this.user = res;
      console.log(this.user);
      return this.user
    });
  }
  /**
   * Opens the user edit dialog
   */
   openUserEditDialog(): void {
    this.dialog.open(EditCardComponent, {
      width: '280px'
    });
  }

  /**
   * Opens the deletion dialog
   */
  openUserDeleteDialog(): void {
    this.dialog.open(DeleteCardComponent, {
      width: '280px'
    });
  }

  getFavMovies(): void {
    let movies: any[] = [];
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      movies = res;
      movies.forEach((movie: any) => {
        if (this.user.FavoriteMovies.includes(movie._id)) {
          this.favMovies.push(movie);
        }
      });
    });
    return this.favMovies;
  }

}
