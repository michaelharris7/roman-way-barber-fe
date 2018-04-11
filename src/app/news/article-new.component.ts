import { Component, OnInit } from '@angular/core';
import { MarkdownService } from 'angular2-markdown';
import { Article } from './article';

@Component({
  selector: 'article-new',
  templateUrl: 'article-new.component.html',
  styleUrls: ['article.component.css']
})

export class ArticleNewComponent implements OnInit {
  public article = new Article;

  constructor(private _markdown: MarkdownService) {
  }

  ngOnInit() {
    this._markdown.renderer.table = (header: string, body: string) => {
      return `
      <table class="table2">
        <thead>
          ${header}
        </thead>
        <tbody>
          ${body}
        </tbody>
      </table>
      `;
    }
    this._markdown.renderer.blockquote = (quote: string) => {
      return `<blockquote class="king-quote">${quote}</blockquote>`;
    }
  }
}