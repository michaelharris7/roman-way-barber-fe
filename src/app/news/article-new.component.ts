import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Article } from './article';
import { ArticleService } from './article.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'article-new',
  templateUrl: 'article-new.component.html',
  styleUrls: ['article.component.css']
})

export class ArticleNewComponent implements OnInit {
  article = new Article;
  submitted: boolean = false;
  userType: string;

  constructor(
    private articleService: ArticleService,
    private tokenService: Angular2TokenService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    if(this.isLoggedIn()) {
      this.userType = this.tokenService.currentUserType;
      console.log(this.userType);
    }
    this.redirectIfNotAdmin();
  }

  createArticle(article) {
    this.submitted = true;
    this.articleService.createArticle(article)
        .subscribe(
          data => { return true },
          error => {
            console.log("Error saving article");
            return Observable.throw(error);
          }
        );
  }
  redirectIfNotAdmin() {
    if(this.userType !== 'ADMIN') {
      this.authService.redirectAfterLogin();
    }
  }
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}