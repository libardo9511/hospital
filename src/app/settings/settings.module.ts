import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SettingsRoutingModule } from "./settings-routing.module";
import { SettingsComponent } from "./settings.component";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { SeleccionarHoraComponent } from "./seleccionar-hora/seleccionar-hora.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        SettingsRoutingModule,
        NativeScriptHttpClientModule
        
    ],
    declarations: [
        SettingsComponent,
        SeleccionarHoraComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    entryComponents: [SeleccionarHoraComponent],
    
})
export class SettingsModule { }
