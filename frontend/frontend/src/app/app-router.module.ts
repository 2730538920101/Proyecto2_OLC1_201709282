import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TablaComponent } from './Componentes/componentes/tabla/tabla.component';
import { ErroresComponent } from './Componentes/componentes/errores/errores.component';
import { AstComponent } from './Componentes/componentes/ast/ast.component';
import { InicioComponent } from './Componentes/componentes/inicio/inicio.component';


const routes:Routes = [
  {
  path: '',
  component: InicioComponent,
  pathMatch: 'full'

},
{
  path: 'symbols',
  component: TablaComponent
},
{
  path: 'errors',
  component: ErroresComponent
},
{
  path: 'ast',
  component: AstComponent
},
{ 
  path: '**',
  redirectTo: ''
}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRouterModule { }
