import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { Page, View } from "tns-core-modules/ui/page";
import { screen } from 'tns-core-modules/platform';
import { CitasService } from "../services/citas.service";
import { RouterExtensions } from "nativescript-angular/router";
import { Cita } from "../modelos/cita";

@Component({
    selector: "Citas",
    templateUrl: "./citas.component.html",
    styleUrls: ["./citas.component.css"]
})
export class CitasComponent implements OnInit {

    btnFab: View = null;
    listaCitas: Array<Cita>;

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
                //this.listaMedicos = result.vehiculo;
                console.log(result.datos);
                for (let row in result.datos) {
                    let cita: Cita = new Cita();
                    cita.id = result.datos[row][0];
                    cita.pacienteId = result.datos[row][1];
                    cita.medicoId = result.datos[row][2];
                    cita.fechaCita = this.fechaMostrar(result.datos[row][3]);
                    cita.isAsistio = result.datos[row][4];
                    this.listaCitas.push(cita);
                }
                console.log(this.listaCitas);
            }
        }, (error) => {
            alert(error);
        });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    nuevaCita() {
        this.routerExtensions.navigate(["/citas/nuevo"]);
    }

    fechaMostrar(fechaStr: string) {

        let fecha: Date = new Date(fechaStr);

        let year = fecha.getFullYear();
        let month = fecha.getMonth() + 1;
        let monthStr = month < 10 ? "0" + month : month;
        let day = fecha.getDay();
        let dayStr = day < 10 ? "0" + day : day;

        let hora = this.formatoHoraAMPM(fecha);
        return year + "/" + month + "/" + dayStr + " - " + hora;

    }

    formatoHoraAMPM(date: Date) {
        let hora = date.getHours();
        let minutos = date.getMinutes();
        let ampm = hora >= 12 ? 'pm' : 'am';
        hora = hora % 12;
        hora = hora ? hora : 12;
        let strMinutos = minutos < 10 ? "0" + minutos : minutos;
        return hora + ':' + strMinutos + ' ' + ampm;
    }

    irABusquedas() {
        this.routerExtensions.navigate(["/citas/busquedas"]);
    }
}
