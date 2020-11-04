import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { CitasService } from "../../services/citas.service";
import { Cita } from '../../modelos/cita';
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { SearchBar } from "tns-core-modules/ui/search-bar";
import { isAndroid } from "tns-core-modules/platform";
import * as dialogs from "tns-core-modules/ui/dialogs";

@Component({
  selector: 'ns-busquedas',
  templateUrl: './busquedas.component.html',
  styleUrls: ['./busquedas.component.css']
})
export class BusquedasComponent implements OnInit {

  constructor(private citasService: CitasService, private routerExtensions: RouterExtensions) { }

  tipoBusqueda: boolean = false;
  public cita: Cita;
  private _searchedText: string = '';
  private arrayCitas: Array<Cita> = [];
  public citas: ObservableArray<Cita> = new ObservableArray<Cita>();
  busquedaSelec: string = "Por Paciente";

  ngOnInit(): void {
    this.arrayCitas = new Array<Cita>();
    this.citasService.obtenerCitas().then((result: any) => {
      if (result.status == true) {
        //this.listaMedicos = result.vehiculo;
        console.log(result.datos);
        for (let row in result.datos) {
          let cita: Cita = new Cita();
          cita.id = result.datos[row][0];
          cita.pacienteId = result.datos[row][1];
          cita.medicoId = result.datos[row][2];
          cita.fechaCita = result.datos[row][3];
          cita.isAsistio = result.datos[row][4];
          this.arrayCitas.push(cita);
        }
        this.citas = new ObservableArray<Cita>();
        this.arrayCitas.forEach(item => {
          this.citas.push(item);
        });
      }
    }, (error) => {
      alert(error);
    });
  }

  cancelar() {
    this.routerExtensions.navigate(["/citas"], { clearHistory: true });
  }

  public onSubmit(args) {
    let searchBar = <SearchBar>args.object;
    let searchValue = searchBar.text.toLowerCase();
    console.log("onSubmit" + searchValue);
    this._searchedText = searchValue;
    this.citas = new ObservableArray<Cita>();
    if (searchValue !== "") {
      if (!this.tipoBusqueda) {

        for (let i = 0; i < this.arrayCitas.length; i++) {
          let idPaciente: string = this.arrayCitas[i].pacienteId.toString();
          console.log("Paciente id: " + idPaciente);
          if (idPaciente.toLowerCase().indexOf(searchValue) !== -1) {
            this.citas.push(this.arrayCitas[i]);
          }
        }
      } else {
        for (let i = 0; i < this.arrayCitas.length; i++) {
          let idMedico: string = this.arrayCitas[i].medicoId.toString();
          console.log("Medico tarjeta: " + idMedico);
          if (idMedico.toLowerCase().indexOf(searchValue) !== -1) {
            this.citas.push(this.arrayCitas[i]);
          }
        }
      }

    }
  }

  public searchBarLoaded(args) {
    let searchBar = <SearchBar>args.object;
    searchBar.dismissSoftInput();

    if (isAndroid) {
      searchBar.android.clearFocus();
    }
    searchBar.text = "";
    console.log("searchBarLoaded");

  }

  public onClear(args) {
    console.log("onClear");

    let searchBar = <SearchBar>args.object;
    searchBar.text = "";
      searchBar.hint = "Buscar ...";

    this.citas = new ObservableArray<Cita>();
    this.arrayCitas.forEach(item => {
      this.citas.push(item);
    });

  }

  public onTextChanged(args) {
    console.log("onChanged");

    this.onSubmit(args);
  }

  elegirOpcionDeBusqueda() {
    dialogs.action("Parámetro de busqueda", "Cancelar", ["Por Paciente", "Por Médico"]).then(result => {
      if (result != "Cancelar") {
        console.log("Resultado dialogo: " + result);
        if (result == "Por Paciente") {
          this.tipoBusqueda = false;
          this.busquedaSelec = "Por Paciente";
        } else if (result == "Por Médico") {
          this.tipoBusqueda = true;
          this.busquedaSelec = "Por Médico";

        }
      }
    });
  }




}
