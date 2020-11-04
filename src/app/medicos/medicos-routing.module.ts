import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { MedicosComponent } from "./medicos.component";
import { NuevoMedicoComponent } from "./nuevo-medico/nuevo-medico.component";
import { DetallesComponent } from "./detalles/detalles.component";
import { EditarComponent} from "./editar/editar.component"


const routes: Routes = [
    { path: "", component: MedicosComponent },
    { path: "nuevo", component: NuevoMedicoComponent },
    { path: "detalles/:codigo", component: DetallesComponent },
    { path: "editar/:codigo", component: EditarComponent }
    
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class MedicosRoutingModule { }
