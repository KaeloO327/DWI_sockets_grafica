import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import {HttpClient } from '@angular/common/http';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit {

  public radarChartData: Array<any> = [
      { data: [ 0, 0, 0, 0, 0, 0,0 ], label: 'Ventas' },
    ]

  public radarChartLabels: Array<any> = [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio' ];
  
  public radarChartType: ChartType = 'radar';

  constructor(
    private http: HttpClient,
    public wsService: WebsocketService
  ) { }

  ngOnInit() {
    this.getData();
    //lamar otro medoto escucharSockets
    this.escucharSocket();
  }

  //crear nuevo metodo
  getData(){

    this.http.get( 'http://localhost:5000/grafica')
    .subscribe( (data: any) => this.radarChartData = data );
  }

  escucharSocket() {
    this.wsService.listen( 'cambio-grafica' )
    .subscribe( (
      data: any
     ) => {
      console.log(
        'socket', data);
        this.radarChartData = data;
     }
    )
  }
}
