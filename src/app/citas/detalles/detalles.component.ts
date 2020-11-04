import { Component, OnInit } from '@angular/core';
import { Cita } from "../../modelos/cita";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";
import { CitasService } from "../../services/citas.service";

@Component({
  selector: 'ns-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  cita: Cita;
  fechaCita: Date;
  horaCita: string = "";

  constructor(private routerExtensions: RouterExtensions, private route: ActivatedRoute, private citasService: CitasService) { }

  ngOnInit(): void {
    const item = this.route.snapshot.params.idCita;
    this.cita = new Cita();
    this.citasService.obtenerCitaById(item).then((result: any) => {
      if (result.status == true) {
        //this.listaMedicos = result.vehiculo;
        console.log(result.datos);
        this.cita.id = result.datos[0];
        this.cita.pacienteId = result.datos[1];
        this.cita.medicoId = result.datos[2];
        this.cita.fechaCita = result.datos[3];
        this.cita.isAsistio = result.datos[4];
        this.fechaCita = new Date(this.cita.fechaCita);
        this.formatoHoraAMPM(this.fechaCita);
      }
    }, (error) => {
      alert(error);
    });
    console.log(item);
  }

  formatoHoraAMPM(date: Date) {
    let hora = date.getHours();
    let minutos = date.getMinutes();
    let ampm = hora >= 12 ? 'pm' : 'am';
    hora = hora % 12;
    hora = hora ? hora : 12;
    let strMinutos = minutos < 10 ? "0" + minutos : minutos;
    this.horaCita = hora + ':' + strMinutos + ' ' + ampm;
  }


  cancelar() {
    this.routerExtensions.navigate(["/citas"], { clearHistory: true });
  }

}
