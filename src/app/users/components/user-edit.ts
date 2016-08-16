import { Component, OnInit } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { FORM_DIRECTIVES } from '@angular/common';


import { UserService } from '../user.service';
import { User } from '../user.model'; 


@Component({
    selector: 'user-edit',
    templateUrl: 'user-edit.html',
    providers: [UserService],
    directives: [FORM_DIRECTIVES]
})
export class UserEdit implements OnInit {

    public errorMessage: string;
    public finished = false;
    newUser : User = new User('');
    public passwordsEqual = false;
    public passwordsNotEqual = false;

    constructor(public userService: UserService) { }

    ngOnInit() {     
    }


    arePasswordsEqual(pass2){
        if(pass2 == this.newUser.password){
            this.passwordsEqual = true;
            this.passwordsNotEqual = false;
        } else {
            this.passwordsNotEqual = true;
            this.passwordsEqual = false;
        }
    }
    
   
    saveUser(){
        this.newUser.admin = false;
        this.userService.saveUser(this.newUser)
        .subscribe(
            data => {
                console.log("success")
            }, 
            err => console.log('fail')
        )
    }

    onSubmit(){
        this.finished = true;
        console.log(this.newUser);
        this.saveUser();
    }
}