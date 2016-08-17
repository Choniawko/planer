import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { url } from '../common/functions/globalUrl';



@Injectable()
export class UserService {

    constructor(private _http:Http) {
    }

    getUsers(){
         return this._http.get(url('users'))
             .map(res => res.json())
             .map((users) => {
                let result:Array<any> = [];
                if (users) {
                    console.log(users);
                    users.forEach((user) => {
                        console.log(user);
                       result.push(user);
                    });
                }
                console.log(result);
                return result;
             });
    }

    saveUser(user){
            console.log('user', user);
            
            let body = JSON.stringify(user);

            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });

            console.log('body', body);

            return this._http.post(url('user'), body, options)
                .map(res => res.json());
        
    }

}
