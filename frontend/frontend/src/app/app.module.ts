import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//IMPORTAR COMPONENTES
import { AppComponent } from './app.component';
//MODULOS INTERNOS
import { ComponentesModule } from './Componentes/componentes/componentes.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//MODULOS EXTERNOS
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ComponentesModule,
    BrowserAnimationsModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
