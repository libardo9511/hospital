import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { filter } from "rxjs/operators";
import * as app from "tns-core-modules/application";
import { SqliteService } from "./services/sqlite.service";
import { registerElement } from "nativescript-angular/element-registry";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
    private _activatedUrl: string;
    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(private router: Router, private routerExtensions: RouterExtensions, private sqliteService: SqliteService) {
        // Use the component constructor to inject services.
        registerElement('DrawingPad', () => require('nativescript-drawingpad').DrawingPad);
        this.sqliteService.getdbConnection()
            .then(db => {
                db.execSQL(`CREATE TABLE IF NOT EXISTS "pacientes" ("pacienteId" TEXT NOT NULL, "nombres" TEXT NOT NULL, "apellidos" TEXT NOT NULL, "fechaNaci" TEXT NOT NULL, "isTratamiento" INTEGER NOT NULL CHECK("isTratamiento" = 0 OR "isTratamiento" = 1), "valorCuota" REAL NOT NULL, PRIMARY KEY("pacienteId"))`).then(() => {
                }, error => {
                    console.log("CREATE TABLE PACIENTES ERROR", error);
                });
                db.execSQL(`CREATE TABLE IF NOT EXISTS "medicos" ("tarjetaProf" TEXT NOT NULL, "especialidad" TEXT NOT NULL, "aniosExperiencia" REAL NOT NULL, "consultorio" TEXT NOT NULL, "isDomicilio" INTEGER NOT NULL CHECK("isDomicilio" = 0 OR "isDomicilio" = 1), PRIMARY KEY("tarjetaProf"))`).then(() => {
                }, error => {
                    console.log("CREATE TABLE MEDICOS ERROR", error);
                });
                db.execSQL(`CREATE TABLE IF NOT EXISTS "citas" ("idCita" INTEGER NOT NULL, "pacienteId" INTEGER NOT NULL, "medicoId" INTEGER NOT NULL, "fechaCita" TEXT NOT NULL, "isAsistio" INTEGER NOT NULL CHECK ("isAsistio" = 0 OR "isAsistio" = 1), "firma" TEXT, PRIMARY KEY("idCita" AUTOINCREMENT), FOREIGN KEY ("pacienteId") REFERENCES pacientes ("pacienteId") ON DELETE CASCADE, FOREIGN KEY ("medicoId") REFERENCES medicos ("tarjetaProf") ON DELETE CASCADE)`).then(() => {
                }, error => {
                    console.log("CREATE TABLE CITAS ERROR", error);
                });
                db.execSQL(`CREATE TABLE IF NOT EXISTS "logs" ("idSentencia" INTEGER NOT NULL, "sentencia" TEXT NOT NULL, PRIMARY KEY("idSentencia" AUTOINCREMENT))`).then(() => {
                }, error => {
                    console.log("CREATE TABLE LOGS ERROR", error);
                });
            });
    }

    ngOnInit(): void {
        this._activatedUrl = "/home";
        this._sideDrawerTransition = new SlideInOnTopTransition();

        this.router.events
            .pipe(filter((event: any) => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    isComponentSelected(url: string): boolean {
        return this._activatedUrl === url;
    }

    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }
}
