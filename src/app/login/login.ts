import { Component, OnInit } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { FORM_DIRECTIVES } from '@angular/common';

import { LoginService } from './login.service';

@Component({
    selector: 'login',
    templateUrl: 'login.html',
    directives: [FORM_DIRECTIVES],
    providers: [LoginService]
})
export class Login implements OnInit {
    data = {
        name: '',
        password: ''
    }
    success: boolean;
    message: string;
    token: string;
    
    constructor(public loginService :LoginService) { }

    ngOnInit() { 
        
    }

     authenticate() {
           console.log(this.data);

         this.loginService.authenticate(this.data)
            .subscribe(
                data => {
                    console.log("success")
                }, 
                err => console.log('fail')
            )
    }

}