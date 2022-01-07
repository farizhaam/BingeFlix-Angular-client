import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  
  user: any = JSON.parse(localStorage.getItem('user') || '');
  movies: any[] = [];
  favMovies: any[] = this.user.FavoriteMovies;

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getUserFavs();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: { name, description },
      width: '500px',
    });
  }

  openDirectorDialog(name: string, bio: string, born: any,): void {
    this.dialog.open(DirectorCardComponent, {
      data: {name, bio, born},
      width: '500px',
    });
  }

  openSynopsisCardDialog(name: string, description: string, year: any,): void {
    this.dialog.open(SynopsisCardComponent, {
      data: {name, description, year},
      width: '500px',
    });
  }

  getUserFavs(): any {
    this.fetchApiData.getFavMovies(this.user.Username).subscribe((res: any) => {
      this.favMovies = res.Favorites;
      return this.favMovies;
    });
  }

  addToFavs(movieId: string, title: string): void {
    this.fetchApiData
      .addToFav(this.user.Username, movieId)
      .subscribe((res: any) => {
        this.snackBar.open(
          `${title} has been added to your favorite movies!`,
          'Okay',
          {
            duration: 2000,
          }
        );
        this.ngOnInit();
      });
    return this.getUserFavs();
  }

  removeFromFavs(movieId: string, title: string): void {
    this.fetchApiData
      .removeFromFav(this.user.Username, movieId)
      .subscribe((res: any) => {
        this.snackBar.open(
          `${title} has been removed from your favorite movies`,
          'Okay',
          {
            duration: 2000,
          }
        );
        this.ngOnInit();
      });
    return this.getUserFavs();
  }

  isFav(movieId: string): boolean {
    return this.favMovies.some((movie) => movie._id === movieId);
  }

  toggleFavs(movie: any): void {
    this.isFav(movie._id)
      ? this.removeFromFavs(movie._id, movie.Title)
      : this.addToFavs(movie._id, movie.Title);
  }
}
