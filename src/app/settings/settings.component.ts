import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LogsService } from "../services/logs.service";
import { EventData } from "tns-core-modules/data/observable";
import { Switch } from "tns-core-modules/ui/switch";
import { ModalDialogOptions, ModalDialogService } from "nativescript-angular";
import { SeleccionarHoraComponent } from "../settings/seleccionar-hora/seleccionar-hora.component";
import { Utilidades } from "../modelos/utils";
import { Page, View } from "tns-core-modules/ui/page";


@Component({
    selector: "Settings",
    templateUrl: "./settings.component.html",
    styleUrls: ["./settings.component.css"]
})
export class SettingsComponent implements OnInit {

    swt: Switch = null;

    constructor(private http: HttpClient, private logsService: LogsService, private _modalService: ModalDialogService, private _vcRef: ViewContainerRef, private page: Page) {
        // Use the component constructor to inject providers.
    }

    datos = {};
    arrDatos = [];
    fechaCita: Date = new Date();
    horaBaseD: Date;
    horaSync: string = "Seleccione una hora";
    utilidades: Utilidades = new Utilidades();
    isChecked: boolean = false;

    onCheckedChange(args: EventData) {
        let sw = args.object as Switch;
        let isChecked = sw.checked; // boolean
        console.log(isChecked);
        this.isChecked = isChecked;
    }

    ngOnInit(): void {
        // Init your component properties here.
        this.logsService.obtenerSentencias().then((result: any) => {
            if (result.status == true) {
                for (let row in result.datos) {
                    let objSON = {
                        id: result.datos[row][0],
                        sentencia: result.datos[row][1]
                    }
                    this.arrDatos[row] = objSON;
                }

                //let obj = result.datos[0];
                this.datos = {
                    "datos": this.arrDatos
                }
                console.log(this.datos);
            }
        }, (error) => {
           console.log(error);
        });

    }

    refresh() {
        this.logsService.obtenerSentencias().then((result: any) => {
            if (result.status == true) {
                for (let row in result.datos) {
                    let objSON = {
                        id: result.datos[row][0],
                        sentencia: result.datos[row][1]
                    }
                    this.arrDatos[row] = objSON;
                }

                //let obj = result.datos[0];
                this.datos = {
                    "datos": this.arrDatos
                }
                console.log(this.datos);
            }
        }, (error) => {
            console.log(error);
        });
    }
    private crearRequestHeader() {
        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });
        return headers;
    }

    obtenerServiciosXTipo() {
        this.anc().subscribe((result: any) => {
            console.log(result);
            this.logsService.eliminarLogs().then((result: any) => {
                if (result.status == true) {
                    this.utilidades.alertaInformacion("Información", result.message, "Ok");
                    this.refresh();
                }
            }, (error) => {
                alert(error);
            });
        }, (error) => {
            console.log(error);
            alert("Error: No hay datos para realizar la sincronización");
        })
    }

    anc() {
        return this.http.post(`https://profundizacionlm.herokuapp.com/api/sincronizacion/sql`, this.datos, { headers: this.crearRequestHeader() });
    }
    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    seleccionarHora(): void {
        const options: ModalDialogOptions = {
            viewContainerRef: this._vcRef,
            fullscreen: true
        };

        this._modalService.showModal(SeleccionarHoraComponent, options)
            .then((result: any) => {
                if (typeof result !== 'undefined') {
                    if (result.horaSync != "Seleccione una hora") {
                        console.log("Selec hora: " + result);
                        let formatoDate: Date = new Date(result.horaSync);
                        this.horaBaseD = formatoDate;
                        this.horaSync = this.utilidades.formatoHoraAMPM(formatoDate);
                    } else {
                        this.horaSync = result.horaSync
                    }
                }
            });
    }

    guardarParametros() {
        if (this.isChecked) {
            this.utilidades.alertaInformacion("Información", "Proximamente ...", "Ok");
        } else {
            this.utilidades.alertaInformacion("Información", "Proximamente ...", "Ok");
        }
    }
}
