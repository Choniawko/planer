import { Component, OnInit } from '@angular/core';
import { CreateMessage, HomeService } from './'

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  directives: [  ],
  providers: [  ]
})
export class HomeComponent implements OnInit {
  public messages;
  public errorMessage : string;
  constructor() {}

  ngOnInit() {

  }
 
}
