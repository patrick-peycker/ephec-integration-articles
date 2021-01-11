import { Injectable } from '@angular/core';
import { JwtHelperService} from'@auth0/angular-jwt'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HelperService } from './helper.service';
import { map, tap } from 'rxjs/operators';

// Rendre le service disponible pour toute l'application et permettre d'injecter d'autres services dans ce service
@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private jwtHelper: JwtHelperService, private http:HttpClient, private helper : HelperService) { }

  isAuthenticated() {
    const token: string = localStorage.getItem("jwt");

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    } else {
      return false;
    }
  }

  signIn(email: string, password: string) { 
    const endpoint = 'api/authenticate/login';
    const credential = JSON.stringify({ email: email, password: password });
    return this.http.post(
      this.helper.base + endpoint,
      credential,
      { headers: new HttpHeaders({ "Content-type": "application/json" }) }
    ).pipe(tap(
      content => {
        const token = (<any>content).token;
        const tokenDecoded = this.jwtHelper.decodeToken(token);
        const role = tokenDecoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        localStorage.setItem("jwt", token);
      },
      error => {console.log ('Error into service !')}
    ));
  }

  signOut() {  
    localStorage.removeItem("jwt");
  }
}
