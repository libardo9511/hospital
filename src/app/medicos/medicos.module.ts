import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { MedicosRoutingModule } from "./medicos-routing.module";
import { MedicosComponent } from "./medicos.component";
import { NuevoMedicoComponent } from "./nuevo-medico/nuevo-medico.component";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { DetallesComponent } from "./detalles/detalles.component";
import { EditarComponent } from "./editar/editar.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        MedicosRoutingModule,
        NativeScriptFormsModule        
    ],
    declarations: [
        MedicosComponent,
        NuevoMedicoComponent,
        DetallesComponent,
        EditarComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class MedicosModule { }
