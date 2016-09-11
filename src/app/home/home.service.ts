import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Observer} from 'rxjs/Rx';

import { WebSocketService } from '../common/services/websocket.service';

const CHAT_URL = 'ws://localhost:3005';

export interface Message {
    author: string;
    message: string;
}

@Injectable()
export class HomeService {
    public messages: Subject<Message>;

    constructor(wsService: WebSocketService) {
        this.messages = <Subject<Message>>wsService
            .connect(CHAT_URL)
            .map((response: MessageEvent): Message => {
                console.log('message', response);
                
                let data = JSON.parse(response.data);

                return {
                    author: data.author,
                    message: data.message,
                }
            })
    }
}