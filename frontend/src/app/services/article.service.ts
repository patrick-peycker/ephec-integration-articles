import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { ArticleModel } from '../models/article';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})

export class ArticleService {

  basket: any[];
  base: string;
  endpoint: string;

  // Création d'un Observable
  basketCounter$: BehaviorSubject<number>;

  constructor(private httpClient: HttpClient, private helper: HelperService) {
    this.base = helper.base;
    this.basket = Array(0);

    // Instanciation de l'Observable
    this.basketCounter$ = new BehaviorSubject<number>(0);
  }

  getAll() {
    this.endpoint = 'api/article/list';
    return this.httpClient.get<ArticleModel[]>(this.base + this.endpoint);
  }

  getById(id: number) {
    this.endpoint = "api/article/item?id=";
    return this.httpClient.get<ArticleModel>(this.base + this.endpoint + id);
  }

  addArticle(article: ArticleModel) {
    this.endpoint = "api/article/add";
    return this.httpClient.post(this.base + this.endpoint, article);
  }

  addToBasket(id: number) {
    let article = this.basket.find(x => x.id == id);

    if (article != null) {
      article.quantite++
    } else {
      this.getById(id).pipe(take(1)).subscribe(

        (content) => {
          this.basket.push(
            {
              id: content.id,
              nom: content.nom,
              quantite: 1
            });
        },

        (error) => {console.log(error)},
      
        () => { this.basketCounter$.next(this.basket.length); }
      );
    }
  }

  deleteFromBasket(id: number) {
    let article = this.basket.find(x => x.id == id);

    if (article != null) {
      article.quantite--

      if (article.quantite == 0) {
        let index = this.basket.indexOf(article);
        this.basket.splice(index, 1);
        this.basketCounter$.next(this.basket.length);
      }
    }
  }
}
