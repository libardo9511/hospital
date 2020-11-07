import { Component, OnInit } from '@angular/core';
import { Cita } from "../../modelos/cita";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";
import { CitasService } from "../../services/citas.service";
import * as imageSourceModule from "tns-core-modules/image-source";
import { Utilidades } from "../../modelos/utils";

@Component({
  selector: 'ns-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  cita: Cita;
  fechaCita: Date;
  horaCita: string = "";
  signatureImage: imageSourceModule.ImageSource
  utilidades: Utilidades = new Utilidades();

  constructor(private routerExtensions: RouterExtensions, private route: ActivatedRoute, private citasService: CitasService) { }

  ngOnInit(): void {
    const item = this.route.snapshot.params.idCita;
    this.cita = new Cita();
    this.citasService.obtenerCitaById(item).then((result: any) => {
      if (result.status == true) {
        this.cita.id = result.datos[0];
        this.cita.pacienteId = result.datos[1];
        this.cita.medicoId = result.datos[2];
        this.cita.fechaCita = result.datos[3];
        this.cita.isAsistio = result.datos[4];
        this.cita.firma = result.datos[5];
        this.fechaCita = new Date(this.cita.fechaCita);
        this.horaCita = this.utilidades.formatoHoraAMPM(this.fechaCita);
        if (this.cita.firma != null) {
          console.log(this.cita.firma.length);
          this.signatureImage = imageSourceModule.fromBase64(this.cita.firma);
        }
      }
    }, (error) => {
      this.utilidades.alertaInformacion("Información", error.messaje, "Ok");
    });
  }

  cancelar() {
    this.routerExtensions.navigate(["/citas"], { clearHistory: true });
  }

}
