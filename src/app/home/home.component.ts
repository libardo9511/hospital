import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { ModalDialogOptions, ModalDialogService } from "nativescript-angular";
import { BuscarCitaComponent } from "./buscar-cita/buscar-cita.component";
import { Cita } from "../modelos/cita";
import { CitasService } from "../services/citas.service";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {

    idPaciente: string = "Seleccione un paciente";
    cita: Cita = new Cita();
    banderaMostrarDatos: boolean = false;
    fechaCita: string = "";

    constructor(private routerExtensions: RouterExtensions, private _modalService: ModalDialogService, private _vcRef: ViewContainerRef, private citasService: CitasService) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    seleccionarPaciente(): void {
        const options: ModalDialogOptions = {
            viewContainerRef: this._vcRef,
            fullscreen: true
        };

        this._modalService.showModal(BuscarCitaComponent, options)
            .then((result: any) => {
                //console.log("modal Home" + result.cita);
                if (result && result.cita != null) {
                    this.cita = new Cita();
                    this.cita = result.cita;
                    this.fechaCita = result.fec;
                    console.log(this.cita.pacienteId.toString());
                    this.idPaciente = this.cita.pacienteId.toString();
                    this.banderaMostrarDatos = true;
                }
            });
    }

    actualizarCita() {
        this.citasService.actualizarCita(this.cita).then((result: any) => {
            if (result.status == true) {
                alert(result.message);
                this.idPaciente = "Seleccione un paciente";
                this.banderaMostrarDatos = false;
                //this.routerExtensions.navigate(["/citas"], { clearHistory: true });
            }
        }, (error) => {
            alert(error);
        });
    }

    firmaPaciente(){
        this.routerExtensions.navigate(["/home/firma"]);
    }
}
