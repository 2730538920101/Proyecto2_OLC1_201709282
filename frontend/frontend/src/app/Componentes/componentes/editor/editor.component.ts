import { Component, OnInit,ViewChild } from '@angular/core';
import { filter,take } from 'rxjs/operators';
import{
  MonacoEditorComponent,
  MonacoEditorConstructionOptions,
  MonacoEditorLoaderService,
  MonacoStandaloneCodeEditor
} from '@materia-ui/ngx-monaco-editor'
import { ServicioService } from '../../../Servicios/servicio.service';

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

  
  ventana:Ventana = {
    nombre: "",
    code: ""
  }

  constructor(private servicio:ServicioService, private monacoLoaderService: MonacoEditorLoaderService) {
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
    this.tabs.push(this.ventana);
    this.ventana = {
      nombre: "",
      code: ""
    }
  }

  CerrarVentana(index:any){
    this.tabs.splice(index, 1);
  }
  @ViewChild(MonacoEditorComponent, { static: false })
  monacoComponent: MonacoEditorComponent = new MonacoEditorComponent(this.monacoLoaderService);
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
    // monaco.editor.setTheme('vs');
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
          this.console = "SE HA AÑADIDO EL CONTENIDO A " + this.tabs[index].nombre + ": DEL ARCHIVO: " + a.name;
        }
        reader.readAsText(a)
      }
    } catch (error) {
      this.console = "NO HA AÑADIDO NINGUNA VENTANA";
    }
  }
  AbrirArchivo(archivo:HTMLInputElement){
    if(this.tabs.length == 0){
      this.console ="NO HA AÑADIDO NINGUNA VENTANA";
    }else{
      archivo.click();
    }
  }

  GuardarArchivo(index:any){
    try {
      this.console = "";
      let nombre = this.tabs[index].nombre + ".sc";
      let content = this.tabs[index].code;
      let type = "text/plain";
      if(this.tabs[index].code != ""){
        this.DescargarArchivo(content, nombre, type);
        this.console = "SE HA GUARDADO EL ARCHIVO: " + nombre;
      }else{
        this.console = "EL ARCHIVO QUE DESEA GUARDAR ESTA VACIO";
      }  
    } catch (error) {
      this.console = "NO HA AÑADIDO NINGUNA VENTANA";
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
    this.servicio.post('http://localhost:3000/backend/analizar' ,this.tabs[index]).subscribe(ventana => console.log(ventana));
  }
 
}
