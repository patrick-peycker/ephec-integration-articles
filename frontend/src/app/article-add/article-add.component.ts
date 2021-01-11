import { Component, OnInit } from '@angular/core';

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { ArticleModel } from '../models/article';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-article-add',
  templateUrl: './article-add.component.html',
  styleUrls: ['./article-add.component.css']
})

export class ArticleAddComponent implements OnInit {

  articleForm: FormGroup;
  isSubmitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private articleService: ArticleService, private router: Router) { }

  ngOnInit(): void {
    this.articleForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.maxLength(20)]],
      description: ['', Validators.required],
      prix: ['', Validators.required],
      stock: ['', Validators.required],
      magasins: this.formBuilder.array([])
    });
  }

  get articleFormGroupControls() { return this.articleForm.controls; }

  get magasinsFormArray() { return this.articleForm.get('magasins') as FormArray; }

  onAddMagasin() {
    const magasinToAdd = this.formBuilder.control(null, Validators.required);
    this.magasinsFormArray.push(magasinToAdd);
  }

  onSubmit() {
    if (this.articleForm.valid) {
      let article = new ArticleModel();
      article.nom = this.articleForm.value.nom;
      article.description = this.articleForm.value.description;
      article.prix = +this.articleForm.value.prix;
      article.stock = +this.articleForm.value.stock;
      article.magasins = this.articleForm.value.magasins;

      this.articleService.addArticle(article).pipe(take(1)).subscribe(
        () => { this.router.navigate(['/home']); }
      )
    } else {
      this.isSubmitted = true;
    }
  }
}
