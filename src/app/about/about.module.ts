import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { AboutComponent } from '../about/about.component';
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { AboutRoutingModule } from "./about-routing.module";

@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    NativeScriptCommonModule,
    AboutRoutingModule
  ]
})
export class AboutModule { }
