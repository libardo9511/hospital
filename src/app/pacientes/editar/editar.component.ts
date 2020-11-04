import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Paciente } from "../../modelos/paciente";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";
import { PacientesService } from "../../services/pacientes.service";
import { ModalDialogOptions, ModalDialogService } from "nativescript-angular";
import { SeleccionarFechaComponent } from "../seleccionar-fecha/seleccionar-fecha.component";
import { confirm } from "tns-core-modules/ui/dialogs";

@Component({
  selector: 'ns-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  constructor(private routerExtensions: RouterExtensions, private route: ActivatedRoute, private pacientesService: PacientesService,
    private _modalService: ModalDialogService, private _vcRef: ViewContainerRef) { }

  paciente: Paciente;
  public fechaNacimiento = new Date();
  estadoSelec: boolean = false;
  idActualizar: string = "";
  confirmacionUpdate: boolean = false;
  //fechaNaci: Date;

  ngOnInit(): void {
    const item = this.route.snapshot.params.id;
    this.paciente = new Paciente();
    this.pacientesService.obtenerPacienteById(item).then((result: any) => {
      if (result.status == true) {
        //this.listaMedicos = result.vehiculo;
        console.log(result.datos);
        this.paciente.identificacion = result.datos[0];
        this.paciente.nombres = result.datos[1];
        this.paciente.apellidos = result.datos[2];
        this.paciente.fechaNaci = result.datos[3];
        this.paciente.isTratamiento = result.datos[4];
        this.paciente.valorCuota = result.datos[5];
        this.fechaNacimiento = new Date(this.paciente.fechaNaci);
        if (this.paciente.isTratamiento == 1) {
          this.estadoSelec = true;
        }
        this.idActualizar = this.paciente.identificacion;
      }
    }, (error) => {
      alert(error);
    });
    console.log(item);
  }

  cancelar() {
    let options = {
      title: "Cancelar Actualización",
      message: "¿Desea abortar la actualización?",
      okButtonText: "Si",
      cancelButtonText: "No"
    };

    confirm(options).then((result: boolean) => {
      if (result) {
        this.routerExtensions.navigate(["/pacientes"], { clearHistory: true });
      }
    });
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

  actualizarPaciente() {
    this.displayConfirmDialog();
  }

  displayConfirmDialog() {
    // >> confirm-dialog-code
    let options = {
      title: "Cuadro de confirmación",
      message: "¿Quiere guardar los cambios?",
      okButtonText: "Si",
      cancelButtonText: "No"
    };

    confirm(options).then((result: boolean) => {

      this.confirmacionUpdate = result;
      
      if (this.confirmacionUpdate) {
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
        this.pacientesService.actualizarPaciente(this.paciente).then((result: any) => {
          if (result.status == true) {
            alert(result.message);
            this.routerExtensions.navigate(["/pacientes"], { clearHistory: true });
          }
        }, (error) => {
          alert(error);
        });
      } else {
        alert("Actualización Cancelada")
      }
    });
    // << confirm-dialog-code
  }

}
