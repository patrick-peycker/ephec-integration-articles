import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { addSyntheticTrailingComment } from 'typescript';
import { ArticleModel } from '../models/article';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  articles: ArticleModel[];

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.articleService.getAll().pipe(take(1)).subscribe(
      (content) => { this.articles = content; }
    )
  }

  onAdd() {
    let article = new ArticleModel();
    article.nom = 'raisin';
    article.prix = 50;
    article.stock = 500;
    article.description = 'super raisin';
    this.articleService.addArticle(article).pipe(take(1)).subscribe(
      () => this.articleService.getAll().pipe(take(1)).subscribe((content) => this.articles = content)
    );

  }


}
