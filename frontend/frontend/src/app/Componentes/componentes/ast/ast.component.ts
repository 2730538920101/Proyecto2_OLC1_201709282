import { Component, OnInit} from '@angular/core';
import { ServicioService } from '../../../Servicios/servicio.service';
import { graphviz } from 'd3-graphviz';

@Component({
  selector: 'app-ast',
  templateUrl: './ast.component.html',
  styleUrls: ['./ast.component.css']
})
export class AstComponent implements OnInit {

  constructor(private servicio:ServicioService) { }

  ngOnInit(): void {
    
  }

  GenerarAst(){
    graphviz("#graph").renderDot(this.servicio.getAstString());
  }
}
