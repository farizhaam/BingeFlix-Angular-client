import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieCardComponent } from '../movie-card/movie-card.component';


@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit{

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar,
    public movieCard: MovieCardComponent,
  ) { }

  ngOnInit(): void {

  }

  toUser(): void {
    this.router.navigate(['profile']);
  }

  userLogout(): void {
    localStorage.clear();
    this.snackBar.open('You successfully logged out! 👋', 'Ok', {
      duration: 2000,
    });
    this.router.navigate(['/welcome']).then(() => {
      window.location.reload();
    });
  }  
}
