import { Component, OnInit } from '@angular/core';
import { ModalDialogParams, RouterExtensions } from "nativescript-angular";
import { SearchBar } from "tns-core-modules/ui/search-bar";
import { isAndroid } from "tns-core-modules/platform";
import { Medico } from '../../modelos/medico';
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { MedicosService } from "../../services/medicos.service";

@Component({
  selector: 'ns-buscar-medico',
  templateUrl: './buscar-medico.component.html',
  styleUrls: ['./buscar-medico.component.css']
})
export class BuscarMedicoComponent implements OnInit {
  public medico: Medico;
  private _searchedText: string = '';
  private arrayMedicos: Array<Medico> = [];
  public medicos: ObservableArray<Medico> = new ObservableArray<Medico>();

  constructor(private medicosService: MedicosService, private _params: ModalDialogParams) { }

  ngOnInit(): void {

    this.arrayMedicos = new Array<Medico>();
    this.medicosService.obtenerMedicos().then((result: any) => {
      if (result.status == true) {
        //this.listaMedicos = result.vehiculo;
        console.log(result.datos);
        for (let row in result.datos) {
          let medico: Medico = new Medico();
          medico.tarjetaProf = result.datos[row][0];
          medico.especialidad = result.datos[row][1];
          medico.aniosExperiencia = result.datos[row][2];
          medico.consultorio = result.datos[row][3];
          medico.isDomicilio = result.datos[row][4];

          this.arrayMedicos.push(medico);
        }
        this.medicos = new ObservableArray<Medico>();
        this.arrayMedicos.forEach(item => {
          this.medicos.push(item);
        });
      }
    }, (error) => {
      alert(error);
    });
  }

  onSelectItem(args) {
    let medico = (this._searchedText !== "") ? this.medicos.getItem(args.index) : this.arrayMedicos[args.index];
    console.log(args.index);
    this._params.closeCallback({
      medico
    });
  }

  public onSubmit(args) {
    let searchBar = <SearchBar>args.object;
    let searchValue = searchBar.text.toLowerCase();
    this._searchedText = searchValue;

    this.medicos = new ObservableArray<Medico>();
    if (searchValue !== "") {
      for (let i = 0; i < this.arrayMedicos.length; i++) {
        if (this.arrayMedicos[i].tarjetaProf.toLowerCase().indexOf(searchValue) !== -1) {
          this.medicos.push(this.arrayMedicos[i]);
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
    searchBar.hint = "Identificación del paciente";

    this.medicos = new ObservableArray<Medico>();
    this.arrayMedicos.forEach(item => {
      this.medicos.push(item);
    });
  }

  public onTextChanged(args) {
    this.onSubmit(args);
  }

}
