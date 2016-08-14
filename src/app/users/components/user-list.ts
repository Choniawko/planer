import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';


@Component({
    selector: 'user-list',
    templateUrl: 'user-list.html',
    providers: [UserService]
})
export class UserList implements OnInit {
    public errorMessage: string;
    public meta = {
        users: [],
    };



    constructor(public userService: UserService) { }

    ngOnInit() {
        this.getUsers();
    }

    getUsers() {
         this.userService.getUsers()
            .subscribe(
                response => {
                        this.meta.users = response;
                        console.log('users', response);
                },
                error => this.errorMessage = <any>error);
    }
}
