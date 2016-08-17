import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { url } from '../common/functions/globalUrl';



@Injectable()
export class LoginService {

    constructor(private _http:Http) {
    }


    authenticate(data){
            console.log('data', data);
            
            let body = JSON.stringify(data);

            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });


            return this._http.post(url('authenticate'), body, options)
                .map(res => res.json());
        
    }

}
