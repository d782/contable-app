import { Routes,RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { EstadisticaComponent } from '../ingreso-egreso/estadistica/estadistica.component';
import { IngresoEgresoComponent } from '../ingreso-egreso/ingreso-egreso.component';
import { DetalleComponent } from '../ingreso-egreso/detalle/detalle.component';
import { DashboardComponent } from './dashboard.component';

export const routes: Routes = [
    {path:'', component:DashboardComponent,children:[
        {path:'', component:EstadisticaComponent},
        {path:'ingreso-egreso', component:IngresoEgresoComponent},
        {path:'detalle', component:DetalleComponent}
    ]}
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class DashboardRoutingModule{}