import { Injectable } from '@angular/core';
import { SqliteService } from "./sqlite.service";
import { Cita } from "../modelos/cita";

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  constructor(private sqliteService: SqliteService) { }

  obtenerCitas() {
    return new Promise<Object>((resolve, reject) => {
      this.sqliteService.getdbConnection()
        .then(db => {
          db.all("SELECT * FROM citas").then(rows => {
            if (rows.length > 0) {
              resolve({ status: true, datos: rows });
            }
            else {
              reject({ status: false, message: "Aún no hay datos" });
            }
          });
        });
    });
  }

  guardarCita(cita: Cita) {
    return new Promise<Object>((resolve, reject) => {
      this.sqliteService.getdbConnection()
        .then(db => {
          db.execSQL("INSERT INTO citas (pacienteId, medicoId, fechaCita, isAsistio) VALUES (?,?,?,?)", [cita.pacienteId.identificacion, cita.medicoId.tarjetaProf, cita.fechaCita, cita.isAsistio]).then(id => {
            resolve({ status: true, message: "Guardado Correctamente" });
          }, err => {
            reject({ status: false, message: "Error al Guardar" });
          });
        });
    });
  }

  actualizarCita(cita: Cita) {
    return new Promise<Object>((resolve, reject) => {
      this.sqliteService.getdbConnection()
        .then(db => {
          db.execSQL("UPDATE citas SET pacienteId = ?, medicoId = ?, fechaCita = ?, isAsistio = ? WHERE idCita = ?", [cita.pacienteId, cita.medicoId, cita.fechaCita, 1, cita.id]).then(id => {
            resolve({ status: true, message: "Registrado Correctamente" });
          }, err => {
            reject({ status: false, message: "Error al Registrar" });
          });
        });
    });
  }

  obtenerCitaById(idCita: string) {
    return new Promise<Object>((resolve, reject) => {
      this.sqliteService.getdbConnection()
        .then(db => {
          db.get(`SELECT * FROM citas WHERE idCita = ?`, [idCita]).then(rows => {
            if (rows.length > 0) {
              resolve({ status: true, datos: rows });
            }
            else {
              reject({ status: false, message: "No exite la cita" });
            }
          });
        });
    });
  }

  obtenerCitasByMedico(idMedico: string) {
    return new Promise<Object>((resolve, reject) => {
      this.sqliteService.getdbConnection()
        .then(db => {
          db.all("SELECT * FROM citas WHERE medicoId = ?", [idMedico]).then(rows => {
            if (rows.length > 0) {
              resolve({ status: true, datos: rows });
            }
            else {
              reject({ status: false, message: "Aún no hay datos" });
            }
          });
        });
    });
  }
  obtenerCitasByPaciente(pacienteId: string) {
    return new Promise<Object>((resolve, reject) => {
      this.sqliteService.getdbConnection()
        .then(db => {
          db.all("SELECT * FROM citas WHERE pacienteId = ?", [pacienteId]).then(rows => {
            if (rows.length > 0) {
              resolve({ status: true, datos: rows });
            }
            else {
              reject({ status: false, message: "Aún no hay datos" });
            }
          });
        });
    });
  }

  obtenerCitasByPacienteFechaCitas() {
    let fechaActual = new Date();
    return new Promise<Object>((resolve, reject) => {
      this.sqliteService.getdbConnection()
        .then(db => {
          db.all("SELECT * FROM citas WHERE isAsistio = 0").then(rows => {
            if (rows.length > 0) {
              resolve({ status: true, datos: rows });
            }
            else {
              reject({ status: false, message: "No se encontraron registros de citas pendientes" });
            }
          });
        });
    });
  }

}
