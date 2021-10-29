import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Errores, Simbolos } from '../Componentes/componentes/editor/editor.component';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private _errores:Array<Errores> = new Array();
  private _simbolos:Array<Simbolos> = new Array();
  private _astString:string ="";
  constructor(private http:HttpClient) { }

  public post(url:string, body:any):Observable<any>{
    return this.http.post(url,body);
  }

  public setErrores(errores:Array<Errores>){
    this._errores = errores;
  }

  public getErrores():Array<Errores>{
    return this._errores;
  }

  public setSimbolos(simbolos:Array<Simbolos>){
    this._simbolos = simbolos;
  }

  public getSimbolos():Array<Simbolos>{
    return this._simbolos;
  }

  public setAstString(ast:string){
    this._astString = ast;
  }

  public getAstString():string{
    return this._astString;
  }
}
