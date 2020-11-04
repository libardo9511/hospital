import { Component, OnInit } from '@angular/core';
import { ModalDialogParams, RouterExtensions } from "nativescript-angular";
import { TimePicker } from 'tns-core-modules/ui/time-picker/time-picker';
import { Observable } from "tns-core-modules/data/observable";
import { Page } from 'tns-core-modules/ui/page/page';

@Component({
  selector: 'ns-seleccionar-hora',
  templateUrl: './seleccionar-hora.component.html',
  styleUrls: ['./seleccionar-hora.component.css']
})
export class SeleccionarHoraComponent implements OnInit {

  horaSelec: string = "";
  constructor(private _params: ModalDialogParams, private page: Page) { }

  ngOnInit(): void {

  }

  onTimeChanged(args) {
    const tp = args.object as TimePicker;
    const time = args.value;
    this.horaSelec = time;
  }

  seleccionarFecha(args) {
    let horaCita = this.horaSelec;
    this._params.closeCallback({
      horaCita
    });
  }

  cancelar() {
    let horaCita = "";
    this._params.closeCallback({
      horaCita
    });
  }
}
