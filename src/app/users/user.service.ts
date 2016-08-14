import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { url } from '../common/functions/globalUrl';

import { User } from './user.model';

@Injectable()
export class UserService {

    constructor(private _http:Http) {
    }

    getUsers(){
        console.log("service");
         return this._http.get(url('users'))
             .map(res => res.json())
             .map((users) => {
                 let result:Array<any> = [];
                if (users) {
                    console.log(users);
                    users.items.forEach((user) => {
                       result.push(
                           user
                       )
                    });
                }
                console.log(result);
                return result;
             });
    }

    saveUser(user){
         
            let body = JSON.stringify(user);

            return this._http.post(url('user'), body)
                .map(res => res.json());
        
    }

}