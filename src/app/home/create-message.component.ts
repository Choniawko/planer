import { Component } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { FORM_DIRECTIVES } from '@angular/common';
import { HomeService } from './';

@Component({
    selector: 'create-message',
    template: `
        <form  (ngSubmit)="onSubmit()" >
            <div class="input-group col-xs-8">
                <input
                    [ngModelOptions]="{standalone: true}"
                    [(ngModel)]="message.message"
                    required
                    type="text"
                    class="form-control"
                    placeholder="message...">
                <span class="input-group-btn">
                    <button
                        
                        class="btn btn-secondary"
                        type="submit">send</button>
                </span>
            </div>
        </form>
    `,
    directives: [ FORM_DIRECTIVES ],
    providers: [  ]
})
export class CreateMessage {
    private submitted = false;
    private message = {
        author: 'gogo',
        message: '',
    }

    constructor(private homeService: HomeService) {}

    private onSubmit() {
        console.log('this.message', this.message);
        
        this.homeService.messages.next(this.message);
        this.message.message = '';
    }
}