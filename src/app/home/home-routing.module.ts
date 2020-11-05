import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { FirmaComponent } from "./firma/firma.component";

import { HomeComponent } from "./home.component";

const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "firma", component: FirmaComponent }
    
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class HomeRoutingModule { }
