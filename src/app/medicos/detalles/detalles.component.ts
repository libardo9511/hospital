import { Component, OnInit } from '@angular/core';
import { Medico } from "../../modelos/medico";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";
import { MedicosService } from "../../services/medicos.service";

@Component({
  selector: 'ns-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  medico: Medico;

  constructor(private routerExtensions: RouterExtensions, private route: ActivatedRoute, private medicosService: MedicosService) { }

  ngOnInit(): void {

    const item = this.route.snapshot.params.codigo;
    this.medico = new Medico();
    this.medicosService.obtenerMedicoById(item).then((result: any) => {
      if (result.status == true) {
        //this.listaMedicos = result.vehiculo;
        this.medico.tarjetaProf = result.datos[0];
        this.medico.especialidad = result.datos[1];
        this.medico.aniosExperiencia = result.datos[2];
        this.medico.consultorio = result.datos[3];
        this.medico.isDomicilio = result.datos[4];
      }
    }, (error) => {
      alert(error);
    });
    console.log(item);
  }

  cancelar() {
    this.routerExtensions.navigate(["/medicos"], { clearHistory: true });
  }

}
