import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { CitasComponent } from "./citas.component";
import { NuevaCitaComponent } from "./nueva-cita/nueva-cita.component";
import { BuscarMedicoComponent } from "./buscar-medico/buscar-medico.component";
import { BuscarPacienteComponent } from "./buscar-paciente/buscar-paciente.component";
import { SeleccionarFechaComponent } from "./seleccionar-fecha/seleccionar-fecha.component";
import { SeleccionarHoraComponent } from "./seleccionar-hora/seleccionar-hora.component";
import { DetallesComponent } from "./detalles/detalles.component";
import { BusquedasComponent } from "./busquedas/busquedas.component"

const routes: Routes = [
    { path: "", component: CitasComponent },
    { path: "nuevo", component: NuevaCitaComponent },
    { path: "paciente", component: BuscarPacienteComponent },
    { path: "medico", component: BuscarMedicoComponent },
    { path: "fecha", component: SeleccionarFechaComponent },
    { path: "hora", component: SeleccionarHoraComponent },
    { path: "detalles/:idCita", component: DetallesComponent },
    { path: "busquedas", component: BusquedasComponent }
    
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class CitasRoutingModule { }
