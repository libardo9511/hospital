import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Paciente } from "../../modelos/paciente";
import { PacientesService } from "../../services/pacientes.service";
import { RouterExtensions } from "nativescript-angular/router";
import { ModalDialogOptions, ModalDialogService } from "nativescript-angular";
import { SeleccionarFechaComponent } from "../seleccionar-fecha/seleccionar-fecha.component";

@Component({
  selector: 'ns-nuevo-paciente',
  templateUrl: './nuevo-paciente.component.html',
  styleUrls: ['./nuevo-paciente.component.css']
})
export class NuevoPacienteComponent implements OnInit {

  paciente: Paciente;
  estadoSelec: boolean = false;
  public fechaNacimiento = new Date();

  constructor(private pacientesService: PacientesService, private routerExtensions: RouterExtensions, private _modalService: ModalDialogService,
    private _vcRef: ViewContainerRef) { }

  ngOnInit(): void {
    this.paciente = new Paciente;
  }

  crearPaciente() {
    if (this.estadoSelec) {
      this.paciente.isTratamiento = 1;
    } else {
      this.paciente.isTratamiento = 0;
    }
    let strFecha = "";
    strFecha += this.fechaNacimiento.getFullYear() + "/";
    strFecha += (this.fechaNacimiento.getMonth() + 1) + "/";
    strFecha += this.fechaNacimiento.getDate();

    this.paciente.fechaNaci = strFecha;
    this.pacientesService.guardarPaciente(this.paciente).then((result: any) => {
      if (result.status == true) {
        alert(result.message);
        this.routerExtensions.navigate(["/pacientes"], { clearHistory: true });
      }
    }, (error) => {
      alert(error);
    });
  }

  cancelar() {
    this.routerExtensions.navigate(["/pacientes"], { clearHistory: true });
  }

  seleccionarTratamiento() {
    if (this.estadoSelec) {
      this.estadoSelec = false;
    } else {
      this.estadoSelec = true;
    }
  }

  seleccionarFechaTap(): void {
    const options: ModalDialogOptions = {
      viewContainerRef: this._vcRef,
      fullscreen: true
    };

    this._modalService.showModal(SeleccionarFechaComponent, options)
      .then((result: any) => {
        if (typeof result !== 'undefined') {
          this.fechaNacimiento = result.fechaNacimiento;
        }
      });
  }
}
