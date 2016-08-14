import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';
import { User } from '../user.model'; 


@Component({
    selector: 'user-edit',
    templateUrl: 'user-edit.html',
    providers: [UserService]
})
export class UserEdit implements OnInit {
    public errorMessage: string;

    constructor(public userService: UserService) { }

    ngOnInit() {     
        this.saveUser();
    }
    
    saveUser(){
        var user = new User({name: "Imie", password: "haslo", admin: true});
        this.userService.saveUser(user)
        .subscribe(
            data => {
                console.log("success")
            }, 
            err => console.log('fail')
        )
    }
}