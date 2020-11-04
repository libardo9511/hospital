import { Component, OnInit } from '@angular/core';
import { Cita } from '../../modelos/cita';
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { CitasService } from "../../services/citas.service";
import { ModalDialogParams, RouterExtensions } from "nativescript-angular";
import { SearchBar } from "tns-core-modules/ui/search-bar";
import { isAndroid } from "tns-core-modules/platform";
import { Page, View } from "tns-core-modules/ui/page";

@Component({
  selector: 'ns-buscar-cita',
  templateUrl: './buscar-cita.component.html',
  styleUrls: ['./buscar-cita.component.css']
})
export class BuscarCitaComponent implements OnInit {

  public cita: Cita;
  private _searchedText: string = '';
  private arrayCitas: Array<Cita> = [];
  public citas: ObservableArray<Cita> = new ObservableArray<Cita>();
  searchBar: View = null;
  fechaCita: string = "";

  constructor(private page: Page, private citasService: CitasService, private _params: ModalDialogParams, private routerExtensions: RouterExtensions) { }

  ngOnInit(): void {
    this.arrayCitas = new Array<Cita>();
    this.citasService.obtenerCitasByPacienteFechaCitas().then((result: any) => {
      if (result.status == true) {
        console.log(result.datos);
        for (let row in result.datos) {
          let cita: Cita = new Cita();
          cita.id = result.datos[row][0];
          cita.pacienteId = result.datos[row][1];
          cita.medicoId = result.datos[row][2];
          cita.fechaCita = result.datos[row][3];

          //this.fechaCita = this.formatoHoraAMPM(new Date(cita.fechaCita));
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

  onSelectItem(args) {
    let cita = (this._searchedText !== "") ? this.citas.getItem(args.index) : this.arrayCitas[args.index];
    let fec = this.formatoHoraAMPM(new Date(cita.fechaCita));
    console.log(args.index);
    this._params.closeCallback({
      cita, fec
    });
  }

  public onSubmit(args) {
    let searchBar = <SearchBar>args.object;
    let searchValue = searchBar.text.toLowerCase();
    this._searchedText = searchValue;

    this.citas = new ObservableArray<Cita>();
    if (searchValue !== "") {
      for (let i = 0; i < this.arrayCitas.length; i++) {
        if (this.arrayCitas[i].pacienteId.toString().indexOf(searchValue) !== -1) {
          this.citas.push(this.arrayCitas[i]);
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

    this.citas = new ObservableArray<Cita>();
    this.arrayCitas.forEach(item => {
      this.citas.push(item);
    });
  }

  public onTextChanged(args) {
    this.onSubmit(args);
  }

  formatoHoraAMPM(date: Date): string {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let monthStr = month < 10 ? "0" + month : month;
    let day = date.getDate();
    let dayStr = day < 10 ? "0" + day : day;
    let hora = date.getHours();
    let minutos = date.getMinutes();
    let ampm = hora >= 12 ? 'pm' : 'am';
    hora = hora % 12;
    hora = hora ? hora : 12;
    let strMinutos = minutos < 10 ? "0" + minutos : minutos;
    return year + "/" + monthStr + "/" + dayStr + " - " + hora + ':' + strMinutos + ' ' + ampm;

  }

  cancelar() {
    let cita = null;
    this._params.closeCallback({
      cita
    });
  }
}

