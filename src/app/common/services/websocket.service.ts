import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Observer} from 'rxjs/Rx';

@Injectable()
export class WebSocketService {

    private subject: Subject<MessageEvent>;

    public connect(url): Subject<MessageEvent> {
        if(!this.subject) {
            console.log("url", url);
            
            this.subject = this.create(url);
            console.log('this.subject', this.subject);
            
        }

        return this.subject;
    }

    public create(url): Subject<MessageEvent> {
        let ws = new WebSocket(url);
        console.log("ws", ws);

        let observable = Observable.create((obs: Observer<MessageEvent>) => {
            ws.onmessage = obs.next.bind(obs);
            ws.onerror = obs.error.bind(obs);
            ws.onclose = obs.complete.bind(obs);

            return ws.close.bind(ws);
        });

        let observer = {
            next: (data: Object) => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify(data));
                }
            },
        };

        return Subject.create(observer, observable);
    }
}