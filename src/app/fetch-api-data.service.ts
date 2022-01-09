import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://moovies-api.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {

  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
  
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
  
  // Non-typed response extraction
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || { };
  } 


  /**
   * Calls the user registration endpoint
   * @function userRegistration
   * @param userDetails the payload of the request
   * @returns an Observable containing a response
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  /**
   * Calls the /login endpoint
   * @function userLogin
   * @param userDetails the payload of the request
   * @returns an Observable containing a response
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  /**
   * Calls the /movies endpoint
   * @function getAllMovies
   * @returns an Observable containing a response
   */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

    /**
   * Calls the /movies/:movieTitle endpoint
   * @function getMovie
   * @param movieTitle the id of the movie to retrieve
   * @returns an Observable containing a response
   */
  public getMovie(title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/${title}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  
  /**
   * Calls the /catalog/genres endpoint
   * @function getAllGenres
   * @returns an Observable containing a response
   */
  public getAllGenres(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'genres', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Calls the /genres/:genreName endpoint
   * @function getGenre
   * @param genreName the name of the genre to retrieve
   * @returns an Observable conianing a response
   */
  public getGenre(name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `genres/${name}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Calls the /catalog/directors endpoint
   * @function getAllActors
   * @returns an Observable containing a response
   */
  public getAllDirectors(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'directors', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Calls the /directors/:directornName endpoint
   * @function getDirector
   * @param directorNane the name of the actor to retrieve
   * @returns an Observable containig a response
   */
  public getDirector(name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `directors/${name}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Calls the /users/:username endpoint
   * @function getUser
   * @param username the name of the user to retrieve
   * @returns an Observable conianing a response
   */
  public getUser(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `users/${username}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Calls the /users/username/favorites endpoint
   * @function getFavMovies
   * @param username the username of the user to retrieve the favorite movies of
   * @returns an Observable containing a response
   */
  public getFavMovies(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `users/${username}/movies`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

    /**
   * Calls the PUT /users/:username/favorites/:movieId endpoint
   * @function addToFav
   * @param username the username of the user we want to update the favorites for
   * @param movieId the id of the movie we want to add to the favorites
   * @returns an Observable containing a response
   */
  public addToFav(username: string, movieId: any): Observable<any> {
    const token = localStorage.getItem('token');
    console.log(apiUrl + `users/${username}/movies/${movieId}`);
    return this.http.post(apiUrl + `users/${username}/movies/${movieId}`, {},
      {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }
  
    /**
   * Calls the DELETE /users/:username/favorites/:movieId endpoint
   * @function removeFromFav
   * @param username the username of the user we want to update the favorites for
   * @param movieId the id of the movie we want to remove from favorites
   * @returns an Observable containing a response
   */ 
  public removeFromFav(username: string, movieId: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `users/${username}/movies/${movieId}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  /**
   * Calls the PUT /users/:username
   * @function editUser
   * @param username the user we want to update the info of
   * @param updatedInfo the new info
   * @returns an Observable containing a response
   */
  public editUser(userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.post(apiUrl + `users/${username}`, userData, {
      headers: new HttpHeaders(
      {
        Authorization: 'Bearer' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  /**
   * Calls the /users/:username/deregister endpoint
   * @function deleteUser
   * @param username the username of the user we want to deregister
   * @returns an Observable containing a response
   */
  deleteUser(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `users/${username}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

}


