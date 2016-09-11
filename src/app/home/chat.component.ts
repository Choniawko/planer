import { Component, ElementRef } from '@angular/core';
import { HomeService, Message } from './';



@Component({
    selector: 'chat',
    template: `
        <div class="messages">
            <p *ngFor="let msg of messages; let last = last">{{ msg.message }}</p>
        </div>
    `,
    directives: [],
    providers: [ HomeService ]
})
export class Chat {
    private messages: Message[] = new Array();

    constructor(private homeService: HomeService) {
        homeService.messages.subscribe(msg => {
            this.messages.push(msg);
        });
    }
}