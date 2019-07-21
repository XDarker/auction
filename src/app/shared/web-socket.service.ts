import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  ws: WebSocket;
  constructor() { }

  createObservableSocket(url: string, id: number) : Observable<any>{
    this.ws = new WebSocket(url);

    return new Observable<string>(
      observable => {
        this.ws.onmessage = (event) => observable.next(event.data);
        this.ws.onerror = (event) => observable.error(event);
        this.ws.onclose = (event) => observable.complete();
        this.ws.onopen = (event) => this.sendMessage({productId: id});

        return () => this.ws.close();
      }
    ).pipe(map(res => JSON.parse(res)));
  }

  sendMessage(message: any){
    console.log("发送消息:" + message)
    this.ws.send(JSON.stringify(message));
  }
}
