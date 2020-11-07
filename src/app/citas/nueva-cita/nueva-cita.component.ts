import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { Cita } from "../../modelos/cita";
import { CitasService } from "../../services/citas.service";
import { ModalDialogOptions, ModalDialogService } from "nativescript-angular";
import { BuscarPacienteComponent } from "../buscar-paciente/buscar-paciente.component";
import { BuscarMedicoComponent } from "../buscar-medico/buscar-medico.component";
import { SeleccionarFechaComponent } from "../seleccionar-fecha/seleccionar-fecha.component";
import { SeleccionarHoraComponent } from "../seleccionar-hora/seleccionar-hora.component";
import { Paciente } from '../../modelos/paciente';
import { Medico } from '../../modelos/medico';
import { Utilidades } from "../../modelos/utils";

@Component({
  selector: 'ns-nueva-cita',
  templateUrl: './nueva-cita.component.html',
  styleUrls: ['./nueva-cita.component.tns.css']
})
export class NuevaCitaComponent implements OnInit {

  cita: Cita = new Cita();
  fechaCita: Date = new Date();
  horaCita: string = "Seleccione una hora";
  idPaciente: string = "Seleccione un paciente";
  idMedico: string = "Seleccione un médico";
  horaBaseD: Date;

  paciente: Paciente;
  medico: Medico;
  utilidades: Utilidades = new Utilidades();

  constructor(private citasService: CitasService, private routerExtensions: RouterExtensions,
    private _modalService: ModalDialogService, private _vcRef: ViewContainerRef) { }

  ngOnInit(): void {
  }

  crearCita() {
    this.cita.isAsistio = 0;
    this.citasService.guardarCita(this.cita).then((result: any) => {
      if (result.status == true) {
        this.utilidades.alertaInformacion("Información", result.message, "Ok");
        this.routerExtensions.navigate(["/citas"], { clearHistory: true });
      }
    }, (error) => {
      this.utilidades.alertaInformacion("Información", error, "Ok");
    });
  }

  cancelar() {
    this.routerExtensions.navigate(["/citas"], { clearHistory: true });
  }

  seleccionarPaciente(): void {
    const options: ModalDialogOptions = {
      viewContainerRef: this._vcRef,
      fullscreen: true
    };

    this._modalService.showModal(BuscarPacienteComponent, options)
      .then((result: any) => {
        if (result) {
          this.paciente = new Paciente();
          this.paciente = result.paciente;
          this.idPaciente = result.paciente.identificacion;
        }
      });
  }

  seleccionarMedico(): void {
    const options: ModalDialogOptions = {
      viewContainerRef: this._vcRef,
      fullscreen: true
    };

    this._modalService.showModal(BuscarMedicoComponent, options)
      .then((result: any) => {
        if (result) {
          this.medico = new Medico();
          this.medico = result.medico;
          this.idMedico = result.medico.tarjetaProf;
        }
      });
  }

  seleccionarFecha(): void {
    const options: ModalDialogOptions = {
      viewContainerRef: this._vcRef,
      fullscreen: true
    };

    this._modalService.showModal(SeleccionarFechaComponent, options)
      .then((result: any) => {
        if (typeof result !== 'undefined') {
          this.fechaCita = result.fechaCita;
        }
      });
  }

  seleccionarHora(): void {
    const options: ModalDialogOptions = {
      viewContainerRef: this._vcRef,
      fullscreen: true
    };

    this._modalService.showModal(SeleccionarHoraComponent, options)
      .then((result: any) => {
        if (typeof result !== 'undefined') {
          if (result.horaCita != "Seleccione una hora") {
            console.log("Selec hora: " + result);
            let formatoDate: Date = new Date(result.horaCita);
            this.horaBaseD = formatoDate;
            this.horaCita = this.utilidades.formatoHoraAMPM(formatoDate);
          } else {
            this.horaCita = result.horaCita
          }
        }
      });
  }

  guardarCita() {

    let cita = new Cita();
    cita.pacienteId = this.paciente;
    cita.medicoId = this.medico;
    let fechaGuardar: Date = new Date(this.fechaCita.getFullYear(), this.fechaCita.getMonth(), this.fechaCita.getDate(), this.horaBaseD.getHours(), this.horaBaseD.getMinutes());
    cita.fechaCita = fechaGuardar.toString();
    cita.isAsistio = 0;

    this.citasService.guardarCita(cita).then((result: any) => {
      console.log(result);
      if (result.status == true) {
        this.utilidades.alertaInformacion("Información", result.message, "Ok");
        this.routerExtensions.navigate(["/citas"], { clearHistory: true });
      }
    }, (error) => {
      this.utilidades.alertaInformacion("Información", error, "Ok");
    });
  }

}
