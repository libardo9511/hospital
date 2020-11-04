import { Component, OnInit } from '@angular/core';
import { ModalDialogParams, RouterExtensions } from "nativescript-angular";

@Component({
  selector: 'ns-seleccionar-fecha',
  templateUrl: './seleccionar-fecha.component.html',
  styleUrls: ['./seleccionar-fecha.component.css']
})
export class SeleccionarFechaComponent implements OnInit {

  fechaSelec: Date = new Date();

  minDate: Date = new Date("1850-01-01");
  maxDate: Date = new Date();

  constructor(private _params: ModalDialogParams) { }

  ngOnInit(): void {
  }

  onDateChanged(args) {
    this.fechaSelec = args.value;
  }

  seleccionarFecha(args) {
    let fechaNacimiento = this.fechaSelec;
    console.log("FC" + this.fechaSelec);
    this._params.closeCallback({
      fechaNacimiento
    });
  }

  cancelar() {
    let fechaNacimiento = "";
    this._params.closeCallback({
      fechaNacimiento
    });
  }

}
