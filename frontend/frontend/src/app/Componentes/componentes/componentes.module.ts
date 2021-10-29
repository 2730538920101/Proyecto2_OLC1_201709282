import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


//INPORTAR COMPONENTES INTENRNOS
import { EditorComponent } from './editor/editor.component';
import { TablaComponent } from './tabla/tabla.component';
import { ErroresComponent } from './errores/errores.component';
import { AstComponent } from './ast/ast.component';
import { AppRouterModule } from '../../app-router.module';

//IMPORTAR COMPONENTES EXTERNOS
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MONACO_PATH , MonacoEditorModule} from '@materia-ui/ngx-monaco-editor';
//IMPORTAR MODULOS DE ANGULAR MATERIAL
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';;
import {MatTableModule} from '@angular/material/table';
import { InicioComponent } from './inicio/inicio.component';





@NgModule({
  declarations: [EditorComponent, TablaComponent, ErroresComponent, AstComponent, InicioComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatGridListModule,
    MatTabsModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MonacoEditorModule,
    MatTableModule,
    AppRouterModule
  ],
  exports: [
    EditorComponent,
    TablaComponent,
    ErroresComponent,
    AstComponent,
    InicioComponent,
    AppRouterModule
  ],
  providers:[
    {
      provide: MONACO_PATH,
      useValue: 'https://unpkg.com/monaco-editor@0.19.3/min/vs'
    }
  ]
})
export class ComponentesModule { }
