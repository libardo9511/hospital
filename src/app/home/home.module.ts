import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { BuscarCitaComponent } from "./buscar-cita/buscar-cita.component";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        HomeRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        HomeComponent,
        BuscarCitaComponent    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    entryComponents: [BuscarCitaComponent]
})
export class HomeModule { }
