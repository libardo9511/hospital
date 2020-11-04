import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { Medico } from "../../modelos/medico";
import { MedicosService } from "../../services/medicos.service";


@Component({
    selector: 'ns-nuevo-medico',
    templateUrl: './nuevo-medico.component.html',
    styleUrls: ['./nuevo-medico.component.css']
})
export class NuevoMedicoComponent implements OnInit {

    medico: Medico = new Medico();
    estadoSelec: boolean = false;

    constructor(private medicosService: MedicosService, private routerExtensions: RouterExtensions) { }

    ngOnInit(): void {
    }

    crearMedico() {
        if (this.estadoSelec) {
            this.medico.isDomicilio = 1;
        } else {
            this.medico.isDomicilio = 0;
        }
        this.medicosService.guardarMedico(this.medico).then((result: any) => {
            if (result.status == true) {
                alert(result.message);
                this.routerExtensions.navigate(["/medicos"], { clearHistory: true });
            }
        }, (error) => {
            alert(error);
        });
    }

    cancelar() {
        this.routerExtensions.navigate(["/medicos"], { clearHistory: true });
    }

    seleccionarDomicilio() {
        if (this.estadoSelec) {
            this.estadoSelec = false;
        } else {
            this.estadoSelec = true;
        }
    }

}
