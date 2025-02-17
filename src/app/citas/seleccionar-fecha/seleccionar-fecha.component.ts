import { Component, OnInit } from '@angular/core';
import { ModalDialogParams, RouterExtensions } from "nativescript-angular";

@Component({
  selector: 'ns-seleccionar-fecha',
  templateUrl: './seleccionar-fecha.component.html',
  styleUrls: ['./seleccionar-fecha.component.css']
})
export class SeleccionarFechaComponent implements OnInit {

  fechaSelec: Date = new Date();

  minDate: Date = new Date();

  constructor(private _params: ModalDialogParams) { }

  ngOnInit(): void {
  }

  onDateChanged(args) {
    this.fechaSelec = args.value;
  }

  seleccionarFecha(args) {
    let fechaCita = this.fechaSelec;
    //console.log("FC" + this.fechaSelec);
    this._params.closeCallback({
      fechaCita
    });
  }

  cancelar() {
    let fechaCita: Date = new Date();;
    this._params.closeCallback({
      fechaCita
    });
  }

}
