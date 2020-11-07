import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { ModalDialogOptions, ModalDialogService } from "nativescript-angular";
import { BuscarCitaComponent } from "./buscar-cita/buscar-cita.component";
import { Cita } from "../modelos/cita";
import { CitasService } from "../services/citas.service";
import { RouterExtensions } from "nativescript-angular/router";
import { Page, View } from "tns-core-modules/ui/page";
import { DrawingPad } from 'nativescript-drawingpad';
import * as imageSourceModule from "tns-core-modules/image-source";
import { ScrollView } from "tns-core-modules/ui/scroll-view"
import { Utilidades } from "../modelos/utils";

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
    signatureImage: imageSourceModule.ImageSource
    signatureImageString: string;
    scroll: ScrollView = null;
    utilidades: Utilidades = new Utilidades();

    constructor(private page: Page, private routerExtensions: RouterExtensions, private _modalService: ModalDialogService, private _vcRef: ViewContainerRef, private citasService: CitasService) {
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
                    this.cita = result.cita;
                    console.log(this.cita);
                    //this.fechaCita = result.fec;
                    //console.log(this.cita.pacienteId.toString());
                    this.idPaciente = this.cita.pacienteId.toString();
                    this.banderaMostrarDatos = true;
                }
            });
    }

    actualizarCita() {
        this.cita.fechaCita = this.utilidades.convertirFechaStringADate(this.cita.fechaCita);
        
        this.citasService.actualizarCita(this.cita).then((result: any) => {
            if (result.status == true) {
                this.idPaciente = "Seleccione un paciente";
                this.banderaMostrarDatos = false;
                this.scroll = this.page.getViewById("scrollId") as ScrollView;
                this.scroll.scrollToVerticalOffset(0, true);
                alert(result.message);
                //this.routerExtensions.navigate(["/home"], { clearHistory: true });
            }
        }, (error) => {
            alert(error);
        });
    }

    public getMyDrawing() {
        const drawingPad = this.page.getViewById('myDrawingPad') as DrawingPad;
        let drawingImage;
        drawingPad.getDrawing().then((result) => {
            if (result) {
                //console.log(result);
                drawingImage = result;
                const source = new imageSourceModule.ImageSource;
                source.setNativeSource(result);
                this.signatureImageString = source.toBase64String("png");
                this.cita.firma = this.signatureImageString;
                this.actualizarCita();
            }
            //this.signatureImage = imageSourceModule.fromBase64(this.signatureImageString);

        }, (err) => {
            alert("Error Obtener firma: " + err);
        });
    }

    sentenciaSQL(){
        this.utilidades.agregarSentencia();
    }

    /*public clearMyDrawing() {
        const drawingPad = this.page.getViewById('myDrawingPad') as DrawingPad;
        drawingPad.clearDrawing();
    }*/
}
