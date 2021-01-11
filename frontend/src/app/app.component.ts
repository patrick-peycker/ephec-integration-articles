import { Component, OnInit } from '@angular/core';
import { ArticleModel } from './models/article';

import { ArticleService } from './services/article.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'app.component';

  articles: ArticleModel[];

  // Injection article.service

  constructor(private articleService: ArticleService) {
    
  }

  ngOnInit(): void {
    this.articleService.getAll().subscribe(
      (ok) => this.articles = ok
    );
  }


}