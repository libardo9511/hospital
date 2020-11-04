import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { PacientesComponent } from "./pacientes.component";
import { NuevoPacienteComponent } from "./nuevo-paciente/nuevo-paciente.component";
import { SeleccionarFechaComponent } from "./seleccionar-fecha/seleccionar-fecha.component";
import { DetallesComponent } from "./detalles/detalles.component";
import { EditarComponent } from "./editar/editar.component";


const routes: Routes = [
    { path: "", component: PacientesComponent },
    { path: "nuevo", component: NuevoPacienteComponent },
    { path: "fechaN", component: SeleccionarFechaComponent },
    { path: "detalles/:id", component: DetallesComponent },
    { path: "editar/:id", component: EditarComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class PacientesRoutingModule { }
