import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { Page, View } from "tns-core-modules/ui/page";
import { screen } from 'tns-core-modules/platform';
import { MedicosService } from "../services/medicos.service";
import { RouterExtensions } from "nativescript-angular/router";
import { Medico } from "../modelos/medico";
import { confirm } from "tns-core-modules/ui/dialogs";
import { Cita } from "../modelos/cita";

@Component({
    selector: "Medicos",
    templateUrl: "./medicos.component.html",
    styleUrls: ["./medicos.component.css"]
})
export class MedicosComponent implements OnInit {

    btnFab: View = null;
    listaMedicos: Array<Medico>;
    isEliminar: boolean = false;

    constructor(private page: Page, private medicosService: MedicosService, private routerExtensions: RouterExtensions) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
        this.btnFab = this.page.getViewById('btn_fab') as View;
        this.btnFab.top = screen.mainScreen.heightDIPs - 210;
        this.btnFab.left = screen.mainScreen.widthDIPs - 90;

        this.listaMedicos = new Array<Medico>();
        this.medicosService.obtenerMedicos().then((result: any) => {
            if (result.status == true) {
                //this.listaMedicos = result.vehiculo;
                //console.log(result.datos);
                for (let row in result.datos) {
                    let medico: Medico = new Medico();
                    medico.tarjetaProf = result.datos[row][0];
                    medico.especialidad = result.datos[row][1];
                    medico.aniosExperiencia = result.datos[row][2];
                    medico.consultorio = result.datos[row][3];
                    medico.isDomicilio = result.datos[row][4];
                    this.listaMedicos.push(medico);
                }
                //console.log(this.listaMedicos);
            }
        }, (error) => {
            alert(error);
        });
        // Init your component
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    /*listarMedicos() {
        return new Promise<Object>((resolve, reject) => {
            this.sqliteService.getdbConnection()
                .then(db => {
                    db.all("SELECT * FROM medicos").then(rows => {
                        if (rows.length > 0) {
                            console.log(rows);
                            resolve({ status: true });
                        }
                        else {
                            reject({ status: false });
                        }
                    });
                });
        });
    }*/

    verificarSiTieneCitasActivas(codTarjeta: string) {
        this.medicosService.verificarHistorialCitas(codTarjeta).then((result: any) => {
            if (result.status == true) {
                //this.listaMedicos = result.vehiculo;
                let fechaActual = new Date();
                //console.log("Citas de medico: " + result.datos);
                for (let row in result.datos) {
                    if (this.compararFechasCitas(fechaActual, new Date(result.datos[row][3]))) {
                        this.isEliminar = true;
                        alert("Imposible eliminar, existen citas pendientes");
                        break;
                    }
                }
            }
        }, (error) => {
            //alert(error);
            this.eliminarMedico(codTarjeta);
        });
    }

    compararFechasCitas(actual: Date, fechCit: Date): boolean {
        let f1TimeStamp = actual.getTime();
        let f2TimeStamp = fechCit.getTime();
        if (f2TimeStamp >= f1TimeStamp) {
            return true;
        }
        return false;
    }

    nuevoMedico() {
        this.routerExtensions.navigate(["/medicos/nuevo"]);
    }

    eliminarMedico(codigoTarjeta: string) {
        // >> confirm-dialog-code
        console.log("Eliminar Medico");
        let options = {
            title: "Cuadro de confirmación",
            message: "Se eliminará también los registros en el historial. ¿Continuar con la eliminación?",
            okButtonText: "Si",
            cancelButtonText: "No"
        };

        confirm(options).then((result: boolean) => {

            if (result) {
                this.medicosService.eliminarMedico(codigoTarjeta).then((result: any) => {
                    if (result.status == true) {
                        alert(result.message);
                        this.refresh();
                        //this.routerExtensions.navigate(["/pacientes"], { clearHistory: true });
                    }
                }, (error) => {
                    alert(error);
                });
                //this.verificarSiTieneCitasActivas(codigoTarjeta);
            } else {
                alert("Eliminación Cancelada")
            }
        });
        // << confirm-dialog-code
    }

    refresh() {
        this.listaMedicos = new Array<Medico>();
        this.medicosService.obtenerMedicos().then((result: any) => {
            if (result.status == true) {
                //this.listaMedicos = result.vehiculo;
                //console.log(result.datos);
                for (let row in result.datos) {
                    let medico: Medico = new Medico();
                    medico.tarjetaProf = result.datos[row][0];
                    medico.especialidad = result.datos[row][1];
                    medico.aniosExperiencia = result.datos[row][2];
                    medico.consultorio = result.datos[row][3];
                    medico.isDomicilio = result.datos[row][4];
                    this.listaMedicos.push(medico);
                }
                //console.log(this.listaMedicos);
            }
        }, (error) => {
            alert(error);
        });
    }

}
