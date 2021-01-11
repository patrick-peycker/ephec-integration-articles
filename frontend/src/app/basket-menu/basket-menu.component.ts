import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-basket-menu',
  templateUrl: './basket-menu.component.html',
  styleUrls: ['./basket-menu.component.css']
})
  
export class BasketMenuComponent implements OnInit, OnDestroy {

  nbItem: number;

  constructor(private articleService: ArticleService) { }
  
  ngOnDestroy(): void {
    
  }

  ngOnInit(): void { 
    this.articleService.basketCounter$.subscribe(
      (content) => { this.nbItem = content;}
    )
  }
}
