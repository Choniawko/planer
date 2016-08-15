import { Component, OnInit } from '@angular/core';
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
  pipes: [ I18nPipe ],
})
export class AppComponent  implements OnInit {
  url = 'https://github.com/preboot/angular2-webpack';
  style = document.createElement('style'); 
  Trianglify = require('trianglify'); 
  pattern = this.Trianglify({width: window.innerWidth, height: window.innerHeight - 20, cell_size: 275})
  styleString = ".btn-color {background-color: " + this.pattern.opts.x_colors[3] + ";}";
  constructor(private api: ApiService,
              private i18n: I18nService
  ) {
    this.i18n.init(lang);
  }

    ngOnInit() {
      this.style.type = 'text/css';     
      this.style.appendChild(document.createTextNode(this.styleString));
         document.body.appendChild(this.pattern.canvas());
        console.log(this.pattern);
        document.head.appendChild(this.style);
        if(document.getElementById('btn-main')) document.getElementById('btn-main').setAttribute("style", "background: "+this.pattern.opts.x_colors[5]);
       
    }
}
