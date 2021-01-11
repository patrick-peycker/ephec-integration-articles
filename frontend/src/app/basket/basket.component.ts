import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  basket: any[];

  constructor(private articleService : ArticleService, private router : Router) { }

  ngOnInit(): void {
    this.basket = this.articleService.basket;
  }

  onAdd(id:number) {
    this.articleService.addToBasket(id);
  }

  onDelete(id: number) {
    this.articleService.deleteFromBasket(id);
  }

  onBack() {
    this.router.navigate(['home']);
  }

}
