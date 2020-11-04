import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Medico } from "../../modelos/medico";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";
import { MedicosService } from "../../services/medicos.service";
import { ModalDialogOptions, ModalDialogService } from "nativescript-angular";
import { confirm } from "tns-core-modules/ui/dialogs";

@Component({
  selector: 'ns-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  medico: Medico;
  estadoSelec: boolean = false;
  confirmacionUpdate: boolean = false;

  constructor(private routerExtensions: RouterExtensions, private route: ActivatedRoute, private medicosService: MedicosService,
    private _modalService: ModalDialogService, private _vcRef: ViewContainerRef
  ) { }

  ngOnInit(): void {
    const item = this.route.snapshot.params.codigo;
    this.medico = new Medico();
    this.medicosService.obtenerMedicoById(item).then((result: any) => {
      if (result.status == true) {
        //this.listaMedicos = result.vehiculo;
        console.log(result.datos);
        this.medico.tarjetaProf = result.datos[0];
        this.medico.especialidad = result.datos[1];
        this.medico.aniosExperiencia = result.datos[2];
        this.medico.consultorio = result.datos[3];
        this.medico.isDomicilio = result.datos[4];
        if (this.medico.isDomicilio == 1) {
          console.log("EDITAR MEDICO " + this.medico.isDomicilio);
          this.estadoSelec = true;
        }
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
        this.routerExtensions.navigate(["/medicos"], { clearHistory: true });
      }
    });
  }

  seleccionarDomicilio() {
    if (this.estadoSelec) {
      this.estadoSelec = false;
    } else {
      this.estadoSelec = true;
    }
  }

  actualizarMedico() {
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
          this.medico.isDomicilio = 1;
        } else {
          this.medico.isDomicilio = 0;
        }
        this.medicosService.actualizarMedico(this.medico).then((result: any) => {
          if (result.status == true) {
            alert(result.message);
            this.routerExtensions.navigate(["/medicos"], { clearHistory: true });
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
