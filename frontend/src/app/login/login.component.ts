import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title: string = 'app.login';

  constructor(private authentication: AuthenticationService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit(): void { }

  getIsAuth() { return this.authentication.isAuthenticated() }

  onLogin(form: NgForm) {
    if (form.valid) {
      this.authentication.signIn(form.value.email, form.value.password).subscribe(
        content => {
          const ru = this.route.snapshot.params['ru'];
            if (ru != null) {
              this.router.navigate([ru]);
            }
          },
          
        error => {
          console.log('signin error into component' + JSON.stringify(error));
        }
      );
    }
  }

  onLogout() {
    this.authentication.signOut();
  }

}
