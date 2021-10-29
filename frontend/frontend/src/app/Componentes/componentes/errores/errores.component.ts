import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/Servicios/servicio.service';
import { Errores } from '../editor/editor.component';
@Component({
  selector: 'app-errores',
  templateUrl: './errores.component.html',
  styleUrls: ['./errores.component.css']
})
export class ErroresComponent implements OnInit {
  errores:Errores[]=[];
  displayedColumns: string[] = ['line', 'column', 'type', 'message'];
  constructor(private servicio:ServicioService) { 
    
  }

  ngOnInit(): void {
    
  }

  GenerarTabla(){
    this.errores = this.servicio.getErrores();
    console.log(this.errores);
  } 
  
}
