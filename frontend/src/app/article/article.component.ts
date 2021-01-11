import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { reduceEachLeadingCommentRange } from 'typescript';
import { AuthenticationService } from '../services/authentication.service';
import { ArticleService } from '../services/article.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})

export class ArticleComponent implements OnInit {
  title = "Article";

  @Input() id: number;
  @Input() nom: string;
  @Input() prix: number;
  @Input() stock: number;

  constructor(private authentication: AuthenticationService, private articleService: ArticleService) { }

  ngOnInit(): void { }

  getIsAuth() { return this.authentication.isAuthenticated();}

  onAdd() {
    this.articleService.addToBasket(this.id);
  }

  getColor() {
    if (this.stock <= 0)
      return 'red';
    else
      return 'green';
  }

  getClass() {
    if (this.stock <= 0)
      return 'list-group-item list-group-item-danger m-2 p-2'
    else
      return 'list-group-item list-group-item-success m-2 p-2'
  }
}
