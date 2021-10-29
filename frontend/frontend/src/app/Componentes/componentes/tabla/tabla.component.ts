import { Component, OnInit } from '@angular/core';
import { Simbolos } from '../editor/editor.component';
import { ServicioService } from '../../../Servicios/servicio.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {
  simbolos:Simbolos[] = []; 
  displayedColumns: string[] = ['valor', 'id', 'type'];
  constructor(private servicio:ServicioService) { }

  ngOnInit(): void {
  }

  GenerarTabla(){
    this.simbolos = this.servicio.getSimbolos();
    console.log(this.simbolos);
  } 
  

}
