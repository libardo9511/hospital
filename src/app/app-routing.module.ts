import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", loadChildren: () => import("~/app/home/home.module").then((m) => m.HomeModule) },
    { path: "pacientes", loadChildren: () => import("~/app/pacientes/pacientes.module").then((m) => m.PacientesModule) },
    { path: "medicos", loadChildren: () => import("~/app/medicos/medicos.module").then((m) => m.MedicosModule) },
    { path: "citas", loadChildren: () => import("~/app/citas/citas.module").then((m) => m.CitasModule) },
    { path: "settings", loadChildren: () => import("~/app/settings/settings.module").then((m) => m.SettingsModule) }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
