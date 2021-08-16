import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';


import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArticleComponent } from './article/article.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './services/authentication.service';
import { BasketComponent } from './basket/basket.component';
import { HomeComponent } from './home/home.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthgardService } from './services/authgard.service';
import { CounterComponent } from './counter/counter.component';
import { BasketMenuComponent } from './basket-menu/basket-menu.component';
import { ArticleAddComponent } from './article-add/article-add.component';
import { ValuesComponent } from './values/values.component';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    LoginComponent,
    BasketComponent,
    HomeComponent,
    ArticleDetailComponent,
    NotFoundComponent,
    CounterComponent,
    BasketMenuComponent,
    ArticleAddComponent,
    ValuesComponent,
  ],

  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'basket', canActivate: [AuthgardService], component: BasketComponent },
      { path: 'login', component: LoginComponent },
      { path: 'detail/:id', component: ArticleDetailComponent },
      { path: 'create', component: ArticleAddComponent },
      { path: 'not-found', component: NotFoundComponent },
      { path: 'counter', component: CounterComponent },
      { path: 'values', canActivate: [AuthgardService], component: ValuesComponent },

      // route wildcard toujours à la fin
      { path: '**', redirectTo: 'not-found' }

    ]),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:5001"],
        blacklistedRoutes: []
      }
    })
  ],


  // Services
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
