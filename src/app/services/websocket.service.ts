
import { Injectable } from '@angular/core';
import { Socket} from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus=false;
  //propiedad != para que sea null 

  constructor(
    private socket: Socket,
    //importar el private
  ) {
    this.checkStatus();
  }

  checkStatus(){
    this.socket.on('connect', () => {
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      this.socketStatus = false;
    })
  }


  emit( evento: string, payload: any , callback?: Function){
    this.socket.emit(evento, payload, callback);
  }

  listen( evento: string){
    return this.socket.fromEvent( evento );
  }
}

