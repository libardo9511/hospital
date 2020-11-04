import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { PacientesRoutingModule } from "./pacientes-routing.module";
import { PacientesComponent } from "./pacientes.component";
import { NuevoPacienteComponent } from "./nuevo-paciente/nuevo-paciente.component";
import { SeleccionarFechaComponent } from "./seleccionar-fecha/seleccionar-fecha.component";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { DetallesComponent } from "./detalles/detalles.component";
import { EditarComponent } from "./editar/editar.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        PacientesRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        PacientesComponent,
        NuevoPacienteComponent,
        SeleccionarFechaComponent,
        DetallesComponent,
        EditarComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PacientesModule { }
