import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { CitasRoutingModule } from "./citas-routing.module";
import { CitasComponent } from "./citas.component";
import { NuevaCitaComponent } from "./nueva-cita/nueva-cita.component";
import { BuscarMedicoComponent } from "./buscar-medico/buscar-medico.component";
import { BuscarPacienteComponent } from "./buscar-paciente/buscar-paciente.component";
import { SeleccionarFechaComponent } from "./seleccionar-fecha/seleccionar-fecha.component";
import { SeleccionarHoraComponent } from "./seleccionar-hora/seleccionar-hora.component";

import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { DetallesComponent } from "./detalles/detalles.component";
import { BusquedasComponent } from "./busquedas/busquedas.component";
@NgModule({
    imports: [
        NativeScriptCommonModule,
        CitasRoutingModule,
        NativeScriptFormsModule                
    ],
    declarations: [
        CitasComponent,
        NuevaCitaComponent,
        BuscarMedicoComponent,
        BuscarPacienteComponent,
        SeleccionarFechaComponent,
        SeleccionarHoraComponent,
        DetallesComponent,
        BusquedasComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers: [
        ModalDialogService,
    ],
    entryComponents: [BuscarMedicoComponent, BuscarPacienteComponent, SeleccionarFechaComponent, SeleccionarHoraComponent],
})
export class CitasModule { }
