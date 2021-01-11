import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArticleModel } from '../models/article';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit, OnDestroy {

  article: ArticleModel;
  subscription: Subscription = new Subscription();

  constructor(private articleService : ArticleService, private route:ActivatedRoute) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.subscription.add(this.articleService.getById(+id).subscribe(
      (content) => this.article = content,
      (error) => console.log('Erreur !')
    ))
  }

}
