import { Component, OnInit } from '@angular/core';
import { Paciente } from "../../modelos/paciente";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";
import { PacientesService } from "../../services/pacientes.service";

@Component({
  selector: 'ns-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  constructor(private routerExtensions: RouterExtensions, private route: ActivatedRoute, private pacientesService: PacientesService) { }

  paciente: Paciente;
  fechaNaci: Date;

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
        this.fechaNaci = new Date(this.paciente.fechaNaci);
      }
    }, (error) => {
      alert(error);
    });
    console.log(item);
  }

  cancelar() {
    this.routerExtensions.navigate(["/pacientes"], { clearHistory: true });
  }

}
