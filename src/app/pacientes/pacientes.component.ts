import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { Page, View } from "tns-core-modules/ui/page";
import { screen } from 'tns-core-modules/platform';
import { Paciente } from "../modelos/paciente";
import { PacientesService } from "../services/pacientes.service";
import { RouterExtensions } from "nativescript-angular/router";
import { confirm } from "tns-core-modules/ui/dialogs";
import { Utilidades } from "../modelos/utils";

@Component({
    selector: "Pacientes",
    templateUrl: "./pacientes.component.html",
    styleUrls: ["./pacientes.component.css"]
})
export class PacientesComponent implements OnInit {

    btnFab: View = null;
    listaPacientes: Array<Paciente>;
    utilidades: Utilidades = new Utilidades();

    constructor(private page: Page, private pacientesService: PacientesService, private routerExtensions: RouterExtensions) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
        this.btnFab = this.page.getViewById('btn_fab') as View;
        this.btnFab.top = screen.mainScreen.heightDIPs - 210;
        this.btnFab.left = screen.mainScreen.widthDIPs - 90;

        this.listaPacientes = new Array<Paciente>();
        this.pacientesService.obtenerPacientes().then((result: any) => {
            if (result.status == true) {
                for (let row in result.datos) {
                    let paciente: Paciente = new Paciente();
                    paciente.identificacion = result.datos[row][0];
                    paciente.nombres = result.datos[row][1];
                    paciente.apellidos = result.datos[row][2];
                    paciente.fechaNaci = result.datos[row][3];
                    paciente.isTratamiento = result.datos[row][4];
                    paciente.valorCuota = result.datos[row][5];
                    this.listaPacientes.push(paciente);
                }
            }
        }, (error) => {
            this.utilidades.alertaInformacion("Información", error.message, "Ok");
        });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    nuevoPaciente() {
        this.routerExtensions.navigate(["/pacientes/nuevo"]);
    }

    eliminarPaciente(identificacion: string) {
        // >> confirm-dialog-code
        let options = {
            title: "Confirmar Eliminación",
            message: "Se eliminará también el historial. ¿Continuar con la eliminación?",
            okButtonText: "Si",
            cancelButtonText: "No"
        };

        confirm(options).then((result: boolean) => {

            if (result) {
                this.pacientesService.eliminarPaciente(identificacion).then((result: any) => {
                    if (result.status == true) {
                        this.utilidades.alertaInformacion("Información", result.message, "Ok");
                        this.refresh();
                    }
                }, (error) => {
                    alert(error);
                });
            } else {
                this.utilidades.alertaInformacion("Información", "Eliminación Cancelada", "Ok");
            }
        });
        // << confirm-dialog-code
    }

    refresh() {
        this.listaPacientes = new Array<Paciente>();
        this.pacientesService.obtenerPacientes().then((result: any) => {
            if (result.status == true) {
                for (let row in result.datos) {
                    let paciente: Paciente = new Paciente();
                    paciente.identificacion = result.datos[row][0];
                    paciente.nombres = result.datos[row][1];
                    paciente.apellidos = result.datos[row][2];
                    paciente.fechaNaci = result.datos[row][3];
                    paciente.isTratamiento = result.datos[row][4];
                    paciente.valorCuota = result.datos[row][5];
                    this.listaPacientes.push(paciente);
                }
            }
        }, (error) => {
            this.utilidades.alertaInformacion("Información", error.message, "Ok")
        });
    }
}
