import { Component, OnInit } from '@angular/core';
import { filter,take } from 'rxjs/operators';
import{
  MonacoEditorConstructionOptions,
  MonacoEditorLoaderService,
  MonacoStandaloneCodeEditor
} from '@materia-ui/ngx-monaco-editor'
import { ServicioService } from '../../../Servicios/servicio.service';
import { Router } from '@angular/router';


export interface Simbolos{
  valor:any,
  id:string,
  type:number
}

export interface Errores{
  line:number,
  column:number,
  type:number,
  message:string
}

interface Ventana{
  nombre:string;
  code:string;
}

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  tabs:Ventana[]=[];
  contador:number=0;
  tablaError:Array<Errores> = new Array();
  tablaSimbolos:Array<Simbolos> = new Array();
  ASTstring:string = "";
  ventana:Ventana = {
    nombre: "",
    code: ""
  }

  constructor(private servicio:ServicioService, private monacoLoaderService: MonacoEditorLoaderService, private _router:Router) {
    this.monacoLoaderService.isMonacoLoaded$
      .pipe(
        filter(isLoaded => isLoaded),
        take(1)
      )
      .subscribe(() => {
        monaco.editor.defineTheme('myCustomTheme', {
          base: 'vs-dark', // can also be vs or hc-black
          inherit: true, // can also be false to completely replace the builtin rules
          rules: [
            {
              token: 'comment',
              foreground: 'ffa500',
              fontStyle: 'italic underline'
            },
            { token: 'comment.js', foreground: '008800', fontStyle: 'bold' },
            { token: 'comment.css', foreground: '0000ff' } // will inherit fontStyle from `comment` above
          ],
          colors: {}
        });
      });
  }


  ngOnInit(): void {
  }

  AgregarVentana(){
    this.contador++;
    this.ventana.nombre = "VENTANA" + this.contador;
    this.console = this.console + 'SE HA CREADO UNA NUEVA VENTANA\n';
    this.tabs.push(this.ventana);
    this.ventana = {
      nombre: "",
      code: ""
    }
  }

  CerrarVentana(index:any){
    this.tabs.splice(index, 1);
    this.console = this.console + 'SE HA CERRADO UNA VENTANA \n';
  }
  editorOptions: MonacoEditorConstructionOptions = {
    theme: 'vs-dark',
    language: 'js',
    roundedSelection: true,
    autoIndent:"full"
  };
  consoleOptions: MonacoEditorConstructionOptions = {
    theme: 'vs-dark',
    language: '',
    roundedSelection: true,
    autoIndent:"full",
    readOnly:true
  };
  console = "";
  
 

  editorInit(editor: MonacoStandaloneCodeEditor) {
    editor.setSelection({
      startLineNumber: 1,
      startColumn: 1,
      endColumn: 50,
      endLineNumber: 3
    });
  }

  CapturarArchivo(evento:any, index:any){
    try {
      let a =evento.target.files[0]
      let text=""
      if(a){
          let reader=new FileReader()
          reader.onload=ev=>{
          const resultado=ev.target?.result
          text=String(resultado)
          this.tabs[index].code=text.toString();
          this.console = this.console+"SE HA AÑADIDO EL CONTENIDO A " + this.tabs[index].nombre + ": DEL ARCHIVO: " + a.name +"\n";
        }
        reader.readAsText(a)
      }
    } catch (error) {
      this.console = this.console+"NO HA AÑADIDO NINGUNA VENTANA\n";
    }
  }
  AbrirArchivo(archivo:HTMLInputElement){
    if(this.tabs.length == 0){
      this.console ="NO HA AÑADIDO NINGUNA VENTANA\n";
    }else{
      archivo.click();
    }
  }

  GuardarArchivo(index:any){
    try {
      let nombre = this.tabs[index].nombre + ".sc";
      let content = this.tabs[index].code;
      let type = "text/plain";
      if(this.tabs[index].code != ""){
        this.DescargarArchivo(content, nombre, type);
        this.console = this.console + "SE HA GUARDADO EL ARCHIVO: " + nombre + "\n";
      }else{
        this.console = this.console + "EL ARCHIVO QUE DESEA GUARDAR ESTA VACIO\n";
      }  
    } catch (error) {
      this.console = this.console + "NO HA AÑADIDO NINGUNA VENTANA\n";
    }
    
  }
  
  DescargarArchivo(content:string, fileName:string,contenType:string)
  {
    var a = document.createElement("a");
    var archivo = new Blob([content], {type: contenType});
    a.href = URL.createObjectURL(archivo);
    a.download = fileName;
    a.click();
  }

  Compilar(index:any){
    this.servicio.post('http://localhost:3000/backend/analizar' ,this.tabs[index]).subscribe(result => {
      for(let i = 0; i < result.prints.length; i++){
        this.console = this.console + result.prints[i] + '\n';
      }
      for(let j=0; j<result.errores.length; j++){
        this.console = this.console + result.errores[j].message + '\n';
      }
      this.tablaError = result.errores;
      this.ASTstring = result.ast;
      this.tablaSimbolos = result.tablasimbolos;
      console.log(result.resultado);
    });
  }
 
  GenerarErrores(){
    this.servicio.setErrores(this.tablaError);
    this._router.navigate(['errors']);
  }

  GenerarTabla(){
    this.servicio.setSimbolos(this.tablaSimbolos);
    this._router.navigate(['symbols']);
  }

  GenerarAST(){
    this.servicio.setAstString(this.ASTstring);
    this._router.navigate(['ast']);
  }

}
