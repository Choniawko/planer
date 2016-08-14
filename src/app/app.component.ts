import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { I18nService, I18nPipe } from './common/services/I18nService';
import { ApiService } from './shared';
import { lang } from './common/lang';

import '../style/main.scss';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'my-app', // <my-app></my-app>
  providers: [ApiService],
  directives: [...ROUTER_DIRECTIVES],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  pipes: [ I18nPipe ]
})
export class AppComponent {
  url = 'https://github.com/preboot/angular2-webpack';

  constructor(private api: ApiService,
              private i18n: I18nService
  ) {
    this.i18n.init(lang);
  }
}
