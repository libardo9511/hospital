import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../modelos/paciente';
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { PacientesService } from "../../services/pacientes.service";
import { ModalDialogParams, RouterExtensions } from "nativescript-angular";
import { SearchBar } from "tns-core-modules/ui/search-bar";
import { isAndroid } from "tns-core-modules/platform";
import { Page, View } from "tns-core-modules/ui/page";

@Component({
  selector: 'ns-buscar-paciente',
  templateUrl: './buscar-paciente.component.html',
  styleUrls: ['./buscar-paciente.component.css']
})
export class BuscarPacienteComponent implements OnInit {

  public paciente: Paciente;
  private _searchedText: string = '';
  private arrayPacientes: Array<Paciente> = [];
  public pacientes: ObservableArray<Paciente> = new ObservableArray<Paciente>();
  searchBar: View = null;

  constructor(private page: Page, private pacientesService: PacientesService, private _params: ModalDialogParams) { }

  ngOnInit(): void {
  
    this.arrayPacientes = new Array<Paciente>();
    this.pacientesService.obtenerPacientes().then((result: any) => {
      if (result.status == true) {
        for (let row in result.datos) {
          let paciente: Paciente = new Paciente();
          paciente.identificacion = result.datos[row][0];
          paciente.nombres = result.datos[row][1];
          paciente.apellidos = result.datos[row][2];
          paciente.fechaNaci = result.datos[row][3];
          paciente.isTratamiento = result.datos[row][4];
          paciente.valorCuota = result.datos[row][5];
          this.arrayPacientes.push(paciente);
        }
        this.pacientes = new ObservableArray<Paciente>();
        this.arrayPacientes.forEach(item => {
          this.pacientes.push(item);
        });
      }
    }, (error) => {
      alert(error);
    });
  }

  onSelectItem(args) {
    let paciente = (this._searchedText !== "") ? this.pacientes.getItem(args.index) : this.arrayPacientes[args.index];
    this._params.closeCallback({
      paciente
    });
  }

  public onSubmit(args) {
    let searchBar = <SearchBar>args.object;
    let searchValue = searchBar.text.toLowerCase();
    this._searchedText = searchValue;

    this.pacientes = new ObservableArray<Paciente>();
    if (searchValue !== "") {
      for (let i = 0; i < this.arrayPacientes.length; i++) {
        if (this.arrayPacientes[i].identificacion.toLowerCase().indexOf(searchValue) !== -1) {
          this.pacientes.push(this.arrayPacientes[i]);
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
  }

  public onClear(args) {
    let searchBar = <SearchBar>args.object;
    searchBar.text = "";
    searchBar.hint = "Buscar por identificación";

    this.pacientes = new ObservableArray<Paciente>();
    this.arrayPacientes.forEach(item => {
      this.pacientes.push(item);
    });
  }

  public onTextChanged(args) {
    this.onSubmit(args);
  }

}
