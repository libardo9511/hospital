import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { Page, View } from "tns-core-modules/ui/page";
import { screen } from 'tns-core-modules/platform';
import { CitasService } from "../services/citas.service";
import { RouterExtensions } from "nativescript-angular/router";
import { Cita } from "../modelos/cita";
import { Utilidades } from "../modelos/utils";

@Component({
    selector: "Citas",
    templateUrl: "./citas.component.html",
    styleUrls: ["./citas.component.css"]
})
export class CitasComponent implements OnInit {

    btnFab: View = null;
    listaCitas: Array<Cita>;
    utilidades: Utilidades = new Utilidades();

    constructor(private page: Page, private citasService: CitasService, private routerExtensions: RouterExtensions) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
        this.btnFab = this.page.getViewById('btn_fab_citas') as View;
        this.btnFab.top = screen.mainScreen.heightDIPs - 210;
        this.btnFab.left = screen.mainScreen.widthDIPs - 140;

        this.listaCitas = new Array<Cita>();
        this.citasService.obtenerCitas().then((result: any) => {
            if (result.status == true) {
                for (let row in result.datos) {
                    let cita: Cita = new Cita();
                    cita.id = result.datos[row][0];
                    cita.pacienteId = result.datos[row][1];
                    cita.medicoId = result.datos[row][2];
                    cita.fechaCita = this.utilidades.formatoFechaHoraStringCompleta(result.datos[row][3]);
                    cita.isAsistio = result.datos[row][4];
                    this.listaCitas.push(cita);
                    
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

    nuevaCita() {
        this.routerExtensions.navigate(["/citas/nuevo"]);
    }

    irABusquedas() {
        this.routerExtensions.navigate(["/citas/busquedas"]);
    }
}
